# my-visits

### Errors and Challenges

- `react-mapbox-gl` was used to mark the map with locations, however only one
- Mapping through locations and returning `<Feature>` components did not work to mark all locations on the map

- Create an account, save your visited locations and view them with plotted points using Mapbox!

- This app uses an API that serves GeoJSON data and saves the data on a mysql database


### Before you run it

(Make sure to `npm install` the dependencies before running the app!)

1. Create a `config.env` file within the `config` folder

2. Use the following code within the `config.env` file

   `NODE_ENV=development`   
   `PORT=5000`   
   `MYSQL_HOST=YOUR_HOST_NAME_HERE`   
   `MYSQL_USER=DATABASE_USERNAME`   
   `MYSQL_PASSWORD=DATABASE_PASSWORD`   
   `MYSQL_DATABASE=DATABASE_NAME`   
   `JWT_SECRET=jwt_secret`  
   `GEOCODER_PROVIDER=YOUR_CHOSEN_PROVIDER`   
   `GEOCODER_API_KEY=YOUR_API_KEY`   

### To run the backend - `npm run mon`

### To run frontend and backend - `npm run dev`