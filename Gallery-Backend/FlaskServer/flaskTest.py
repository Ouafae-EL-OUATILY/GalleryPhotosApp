import base64
import math
import numpy as np
from flask import Flask, request, redirect, url_for, jsonify
import os
import cv2
from flask_cors import CORS
from pymongo import MongoClient
from sklearn.cluster import KMeans
from bson import ObjectId, json_util
import json


app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/picsV1'

# Create MongoClient
mongo = MongoClient(app.config['MONGO_URI'])

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.debug = True


@app.route('/mongo/<userId>',methods=['GET'])
def getImgs(userId):
    try:
        print(userId,"iiiiiiiiiiiii")
        db = mongo.get_database('PicsV1')
        collection = db['images']

        # Example: Retrieve data from MongoDB
        AllUserImg= list(collection.find({'userId':ObjectId(userId)}))
        print(f"Found images: {len(AllUserImg)}")


        return AllUserImg
    except Exception as e :
        return str(e)





@app.route('/upload/', methods=['POST', 'GET'])
def upload():
    data = request.get_json()
    if 'base64_image' not in data:
        return 'No base64 image provided'

    base64_image = data['base64_image']
    base64_image = base64_image.split(',')[1]
    try:
        # Decode the base64 image data
        image_data = base64.b64decode(base64_image)

        # Specify the upload folder and file name
        upload_folder = app.config['UPLOAD_FOLDER']
        filename = os.path.join(upload_folder, 'uploaded_image.jpeg')

        # Save the image to the specified file
        with open(filename, 'wb') as f:
            f.write(image_data)

        return redirect(url_for('calculate', filename='hist_uploaded_image.jpeg'))

    except Exception as e:
        return f'Error: {str(e)}'


@app.route('/calculs')
def calculate():
    # =============== Histogram ===============#
    img_path = os.path.join(app.config['UPLOAD_FOLDER'], 'uploaded_image.jpeg')
    img = cv2.imread(img_path, 1)
    chans = cv2.split(img)
    colors = ("blue", "green", "red")
    histogram = {}

    for (chan, color) in zip(chans, colors):
        hist = cv2.calcHist([chan], [0], None, [256], [0, 256])
        histogram.update({
            f"{color}": hist.flatten().tolist()
        })

    #=============== Dominant ===============#
    # Resize the image
    width = 50  # Change this to your desired width
    ratio = img.shape[0] / img.shape[1]
    height = int(img.shape[1] * ratio)
    dim = (width, height)
    img = cv2.resize(img, dim)

    # Number of dominant colors
    nbreDominantColors = 10  # Change this to the desired number of dominant colors

    # Reshape the image
    examples = img.reshape((img.shape[0] * img.shape[1], 3))

    # Apply K-Means clustering
    kmeans = KMeans(n_clusters=nbreDominantColors)
    kmeans.fit(examples)

    # Get the cluster centers representing dominant colors
    colors = kmeans.cluster_centers_.astype(int)

    #=============== Moment ===============#
    lab_image = cv2.cvtColor(img, cv2.COLOR_BGR2Lab)
    Lightness, greenRed, blueYellow = cv2.split(lab_image)

    l_mean = np.mean(Lightness)
    l_std = math.sqrt(np.mean((Lightness - l_mean) ** 2))
    l_skew = np.mean((Lightness - l_mean) * 3) * (1 / 3)
    l_kurtosis = np.mean((Lightness - l_mean) * 4) * (1 / 4)

    a_mean = np.mean(greenRed)
    a_std = math.sqrt(np.mean((greenRed - a_mean) ** 2))
    a_skew = np.mean((greenRed - a_mean) * 3) * (1 / 3)
    a_kurtosis = np.mean((greenRed - a_mean) * 4) * (1 / 4)

    b_mean = np.mean(blueYellow)
    b_std = math.sqrt(np.mean((blueYellow - b_mean) ** 2))
    b_skew = np.mean((blueYellow - b_mean) * 3) * (1 / 3)
    b_kurtosis = np.mean((blueYellow - b_mean) * 4) * (1 / 4)

    color_moments = { "l_mean": f'{l_mean}', "l_std": f'{l_std}',"l_skew": f'{l_skew}', "l_kurtosis": f'{l_kurtosis}',
                     "a_mean": f'{a_mean}', "a_std": f'{a_std}', "a_skew": f'{a_skew}', "a_kurtosis": f'{a_kurtosis}',
                     "b_mean": f'{b_mean}', "b_std": f'{b_std}', "b_skew": f'{b_skew}', "b_kurtosis": f'{b_kurtosis}'}

    #==================gabor================#

    k_size = 9  # Taille du noyau du filtre de Gabor
    orientations = 4  # Nombre d'orientations
    scales = 3  # Nombre d'échelles

    gabor_descriptors = []

    for theta in np.arange(0, np.pi, np.pi / orientations):
        for scale in range(scales):
            # Créer un noyau de filtre de Gabor avec l'orientation et l'échelle spécifiées
            gabor_kernel = cv2.getGaborKernel(
                (k_size, k_size),
                sigma=1.0,
                theta=theta,
                lambd=5.0,
                gamma=0.5,
                psi=0,
                ktype=cv2.CV_32F
            )

            # Appliquer le filtre de Gabor à la région
            filtered_region = cv2.filter2D(img, cv2.CV_8UC3, gabor_kernel)

            # Calculer une statistique sur la région filtrée (par exemple, la moyenne)
            gabor_statistic = np.mean(filtered_region)

            # Ajouter la statistique de la région filtrée aux descripteurs de Gabor
            gabor_descriptors.append(gabor_statistic)


            #=====================tamura====================

            gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

            # Calcul des caractéristiques de texture de Tamura
            contrast = np.mean(cv2.Laplacian(gray_image, cv2.CV_64F))
            coarseness = np.mean(cv2.Sobel(gray_image, cv2.CV_64F, 1, 0))
            regularity = np.mean(cv2.Sobel(gray_image, cv2.CV_64F, 2, 0))
            roughness = np.mean(cv2.Sobel(gray_image, cv2.CV_64F, 1, 1))

            tamura = {"contrast": f'{contrast}',"coarseness": f'{coarseness}',"regularity": f'{regularity}',"roughness": f'{roughness}'}

    return {"histogram": histogram, "dominant_colors": colors.tolist(),"color_moments": color_moments,"gabor": gabor_descriptors, "tamura": tamura }



def calculate_distance(feature_query, feature_database):
    # Calculate Euclidean distances for a single feature
    distances = []

    for i in range(len(feature_query)):
        calc = (float(feature_query[i]) - float(feature_database[i])) ** 2
        distances.append(calc ** 0.5)


    return distances


def calculate_distance2(feature_query, feature_database):
    distances = []

    for i in range(len(feature_query)):
        x = 0
        for j in range(len(feature_query[i])):
            calc = (float(feature_query[i][j]) - float(feature_database[i][j])) ** 2
            x = x + (calc ** 0.5)
        distances.append(x)


    return distances

@app.route('/similar/<imgId>/<userId>', methods=['GET'])
def calculate_similarity(imgId,userId):
    db = mongo.get_database('PicsV1')
    collection = db['images']
    coll = db['similarities']

    sim = coll.find_one({'ImageId':ObjectId(imgId)})
    if sim :
        coll.delete_one({'ImageId': ObjectId(imgId)})

    # Example: Retrieve data from MongoDB
    img = collection.find_one({'_id': ObjectId(imgId)})
    AllUserImg= list(collection.find({'userId': ObjectId(userId)}))

    # Extract query features
    query_features = {
        'tamura_texture': list(img["tamura"].values()),
        'gabor_texture': img["gabor"],
        'histogram': list(img["Histogram"].values()),
        'color_moments': list(img["moment"].values()),
        'color_domaine': img["dominant"]
    }


    # Extract database features
    database_features = {
        'tamura_texture': [list(img["tamura"].values()) for img in AllUserImg],
        'gabor_texture': [img["gabor"] for img in AllUserImg],
        'histogram': [list(img["Histogram"].values()) for img in AllUserImg],
        'color_moments': [list(img["moment"].values()) for img in AllUserImg],
        'color_domaine': [img["dominant"]for img in AllUserImg],
        'src': [img["src"] for img in AllUserImg]
    }

    # Calculate global distance
    global_distances = []

    for i in range(len(database_features['gabor_texture'])):
        texture_distancesT = calculate_distance(query_features['tamura_texture'],
                                                database_features['tamura_texture'][i])
        texture_distancesG = calculate_distance(query_features['gabor_texture'], database_features['gabor_texture'][i])
        color_distancesH = calculate_distance2(query_features['histogram'], database_features['histogram'][i])
        color_distancesCM = calculate_distance(query_features['color_moments'], database_features['color_moments'][i])
        color_distancesCD = calculate_distance2(query_features['color_domaine'], database_features['color_domaine'][i])

        combined_global_distance = np.mean(texture_distancesT)/2 + np.mean(
            texture_distancesG)/2 + np.mean(color_distancesCM)/3 + np.mean(color_distancesH)/3 + np.mean(
            color_distancesCD)/3
        global_distances.append({"ImgId" : AllUserImg[i]['_id'],"distance":combined_global_distance,"src":AllUserImg[i]['src']})

    # Sort images based on similarity scores (smaller distance is more similar)
    sortedimg = sorted(global_distances, key=lambda x: x['distance'])

    #insert Data into MongoDB
    try:
        coll.insert_one({"userId":ObjectId(userId),"ImageId":ObjectId(imgId),"SimilarSet":sortedimg})
    except Exception as e:
        return f'Error: {str(e)}'

    # Return the IDs of the top 2 similar images
    data = sortedimg[1:5]
    serialized_result = json.loads(json_util.dumps(data))

    return serialized_result


@app.route('/recherche', methods=['POST'])
def calculate_similarity_route():
    data = request.json

    query_image_data = data.get('image_query_data', {})

    database_image_data = data.get('data', [])

    # Perform similarity calculation using query_image_data and database_image_data
    similar_images_ids = calculate_similarity(query_image_data, database_image_data)

    # Return the response with similar image IDs
    response_data = {'similar_images_ids': similar_images_ids}
    return {response_data}



if __name__ == '__main__':
    app.run()
