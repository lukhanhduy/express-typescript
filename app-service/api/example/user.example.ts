export const UserExample = {
  "register": {
    "errors": [
      {
        "statusCode": 422,
        "data": {
          "errors": {
            "firstName": [
              "The firstName field is required."
            ],
            "lastName": [
              "The lastName field is required."
            ],
            "email": [
              "The email field is required."
            ],
            "password": [
              "The password field is required."
            ]
          }
        }
      },
      {
        "statusCode": 406,
        "message": "This email or phone has been registed",
        "data": {}
      }
    ],
    "success": [
      {
        "statusCode": "200",
        "message": "Your account has been registed",
        "data": {}
      }
    ]
  }
}