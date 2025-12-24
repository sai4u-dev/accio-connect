1. Only people connected to accio will be able to use Accio_Connect
2. Two types of posts Referal Posts, General feed/posts
3. User can send/get connect request
4. Users will be able to chat with each other after they are connected
5. Both type of posts will have like and comment features
6. User will be able to see everyones post doesnt matter if connected or not
7. Search bar to search user
8. User should be able to add either of them in post image, video, blog/text
9. User should be able to see the online status of other users
10. User should see his own profile as well as others profile
11. User can block the comment section while creating post and can also delete post
12. Admin can delete anyones post/ comment/ user/
13. Admint dashboard where admin can see reported users/ post with user comments why user reported and counts
14. Add fiel in User model isPlaced : boolean, placedInfo : {orgName:String,role/designation:String,package?:Number, }, createdAt : timestamp
    User will add all placed details including offer letter sends request to admin to verify once verified all placed users will be seen by tick batch
15. Profile visit count

## Flow chart

```

Step 1 :
Sign up page
Only people/users present inside acciojob database can signup and use accio_connect

Step 2 :
Sign in page
Include token authentication and password hashing

Step 3 :
 User lands on home page
User should see header section with Logo, Search bar, Theme toggle, Profile Section
User should see all the posts in body section
Side bar should contain these modules chat, referal posts, create posts
Right side of posts can display recently placed students

Step 4 :
 Once clicked on profile
Profile page should open and user should be able to see only users posts/other info

Step 5 :
 Once clicked on create post
A pop up should be opened with form
Ask Type of post, if general give drop down to select which post image, video, blog, give input box to type caption, give option to block comment section and like section
if referal post, org name, role name, location, text area as same as blog (if user wants to share more ifno)

Step 6 :
Once clicked on chat
Open a chat page where user can see all other existing users
User will be able to chat only with connected users
If not connected user will see only name and profile image and a connect button once clicked a connect request will be gone to the other user

Step 7 :
Once clicked on referal posts
User should see only referal posts in body and within the same page
Give an option to diselect the referal posts

PHASE - 1

Sign Up
Sing In
Home page (All posts, Profile posts, Search, Theme)(Side bar, Referal posts,Create New Post )(Posts with like and comment)

```

```
src/
 ├── app.js
 ├── server.js
 ├── config/
 │    ├── db.js
 │    └── env.js
 ├── modules/user/
 │    ├── user.model.js
 │    ├── user.routes.js
 │    ├── user.controller.js
 │    ├── user.service.js
 │    ├── user.repository.js
 │    └── user.schema.js
 ├── middlewares/
 │    ├── auth.middleware.js
 │    ├── error.middleware.js
 ├── utils/
 │    ├── jwt.js
 │    └── asyncHandler.js
```
