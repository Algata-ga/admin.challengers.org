# API SPECIFICATIONS

All valid results are `JSON`

1. **GET** - `/isLoggedIn`

Checks if a user is logged in and returns the status `loggedIn` as true or false


*Response*
```json
{
    "loggedIn" : true
}
```

2. **POST** - `/login`

Checks if a user's user name and password is correct and returns login status

*Request*
```json
{
    "username" : "name",
    "password" : "pass"
}
```

*Response*
```json
{
    "loggedIn": true
}
```

3. **POST** - `/logout`

Logs out the current user

*Response*
```json
{
    "loggedIn":false
}
```
4. **POST** - `/uploadAd`
    
Upload an image or a video, save it to a folder and store the filepath in database. This should only be accessible to logged in users

*Request*
`File and formData`

*Response*
```json
{
    "success" : true
}
```

5. **POST** - `/deleteAd/<id>`

Delete the ad with the id in the url

*Response*
```json
{
    "success": true
}
```

6. **POST** - `/updateAd/<id>`

Update an ad with a new video/image

Same Request as `/uploadAd`

*Response*
```json
{
    "updated" : true
}
```

7. **GET** - `/getAds`

Return all the ads available



## Additional

Ad 

```json
{
    id : 1,
    title : "name",
    description : "stuff...",
    filename : "hello.png",
    isVideo: true,
    duration: 5
}
```

the `duration` field store the length of the video in seconds on `null` in case of an image











