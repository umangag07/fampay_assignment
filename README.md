# FamPay Backend Assignment

## Project Goal
To make an API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

## Functionalities
1. Backend APIs to fetch youtube videos data
    * `/videos/get/{pageNumber}` Endpoint to fetch the videos in paginated format
    * `/videos/search/{query_string}` Endpoint to search the video based on query string for title & description 
    * More information on how to fetch data from APIs [here](#apis)
 2. Fetch the youtube videos data every 30 seconds using the cron-scheduler.
 3. Search query optimised for patial matches.<br> Example:  A video with title `How to make tea?` should match for the search query `tea how`.
 4. Dasahboard to View the data.
    
    
    


## <a name="apis"></a>Backend APIs

### Request
1. `GET api/v1/videos/get/{page}?limit=12` 
    * Fetches the videos saved in the database in descending order of published datetime.
    * {page} is optional for first page.
    * `limit` query paramater is optional.
    * Default page=1, limit=10

<details>
<summary>Example</summary>
<pre>
Example: http://localhost:5000/api/v1/videos/get/3?limit=12
<pre>
</details>
<details>
<summary>Response Format</summary>
<pre>
{
   "message": "success",
   "totalPages": no_of_totalPages,
   "currentPage": current_page,
   "responseLength": data_length_currentPage,
   "data":[]
}
<pre>
</details>
<details>
<summary>Example Response</summary>
<pre>
{
   "message": "success",
   "totalPages": 5,
   "currentPage": 1,
   "responseLength": 10,
   "data":[
     {
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/eetMjE4Ou0c/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/eetMjE4Ou0c/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/eetMjE4Ou0c/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "_id": "6306049352fcf598bed1f9e8",
            "title": "The Myth of South America",
            "description": "Try The Athletic for FREE for 30 days: https://theathletic.com/tifofootball South America has produced some of the greatest ever ...",
            "videoId": "eetMjE4Ou0c",
            "channelId": "UCGYYNGmyhZ_kwBF_lqqXdAQ",
            "channelTitle": "Tifo Football",
            "publishedAt": "2022-08-24T06:00:08.000Z",
            "publishTime": "2022-08-24T06:00:08.000Z",
            "createdAt": "2022-08-24T10:59:31.728Z",
            "updatedAt": "2022-08-24T10:59:31.728Z",
            "__v": 0
        },...
   ]
}
<pre>
</details>

2. `GET api/v1/videos/search/{queryString}?page=1&limit=12` 
    * Gives the result based on search query.
    * {queryString} type the query to be searched
    * 'page' query paramater is optional for first page.
    * 'limit' limit paramater is optional.
    * Default page=1, limit=10

<details>
<summary>Example</summary>
<pre>
http://localhost:5000/api/v1/videos/search/football?page=1&limit=1
<pre>
</details>
<details>
<summary>Response Format</summary>
<pre>
{
   "message": "success",
   "totalPages": no_of_totalPages,
   "currentPage": current_page,
   "responseLength": data_length_currentPage,
   "data":[]
}
<pre>
</details>
<details>
<summary>Example Response</summary>
<pre>
{
   "message": "success",
   "totalPages": 5,
   "currentPage": 1,
   "responseLength": 10,
   "data":[
     {
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/eetMjE4Ou0c/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/eetMjE4Ou0c/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/eetMjE4Ou0c/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "_id": "6306049352fcf598bed1f9e8",
            "title": "The Myth of South America",
            "description": "Try The Athletic for FREE for 30 days: https://theathletic.com/tifofootball South America has produced some of the greatest ever ...",
            "videoId": "eetMjE4Ou0c",
            "channelId": "UCGYYNGmyhZ_kwBF_lqqXdAQ",
            "channelTitle": "Tifo Football",
            "publishedAt": "2022-08-24T06:00:08.000Z",
            "publishTime": "2022-08-24T06:00:08.000Z",
            "createdAt": "2022-08-24T10:59:31.728Z",
            "updatedAt": "2022-08-24T10:59:31.728Z",
            "__v": 0
        },...
   ]
}
<pre>
</details>
    
