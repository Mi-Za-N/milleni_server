# millenivision-server-side

## npm install

#### regitrasion otp send api url link: http://localhost:5000/users

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
    "code":"+88",
     "first_name":"Emon",
      "last_name":"Islam",
      "phone":"01943177541",
     "email":"emonislamweb@gmail.com",
      "password":"12345678"

})
})
.then((res) => res.json())
.then((data) => console.log(data));

};

```
### note: user ke jokhon registration korben tokhon user er ekta token paben oi token ta localstorage e save korben tarpor user ke jokhon verify korben tokhon oi token ta authorization diye diben verify api ke korar sumai evabe diben.

#### user registration verify otp api url link: http://localhost:5000/users/verify

    fetch("http://localhost:5000/users/verify", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "authorization":`Bearer ${token}`,
      },
      body: JSON.stringify({
    "otp":"445599"

})
})
.then((res) => res.json())
.then((data) => console.log(data));

};
```

#### create register user Api url link: http://localhost:5000/users

```body pass Data example:
fetch(`http://localhost:5000/users`,{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    }
   body: JSON.stringify({
    "first_name": "Emon",//requerd
    "last_name": "Islam",//requerd
    "phone": 23223423,//requerd
    "email": "emon@example.com",//requerd
    "password": "12345678",//requerd
    "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",//by default creating
     interest_list:[] //optional
}),

 })
    .then(res => res.json())
    .then(data => console.log(data))

```

#### login user Api url link: http://localhost:5000/users/login

```body pass Data example:

 fetch('http://localhost:5000/users/login',{
     method:'POST',
     headers: {
    'Content-Type': 'application/json'},
    body:JSON.stringify({
        "email":"example.com", //requerd
        "password":"21324" //requerd
    })
 })
    .then(res => res.json())
    .then(data => console.log(data))
```

#### current user update api url link http://localhost:5000/users/:email

```example:
fetch('http://localhost:5000/users/:email',{
method:'PUT',
headers: {
    'Content-Type': 'application/json'
    'authorization': `Bearer ${token}` //requerd
    },
    body:JSON.stringify({
    "first_name": "Emon edit", //optional update
    "last_name": "Islam edit", //optional update
    "pic": "url", //optional update
    "interest_list":"[]" //optional update
    })
})
.then(res => res.json())
.then(data => console.log(data))
```

#### event create current user Api url link: http://localhost:5000/api/events/create

```Creating event Example :
fetch(`http://localhost:5000/api/events/create`,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}` //requerd
    },
    body: JSON.stringify({
    "event_Image": "test image", //requerd
    "list_of_communities": [], //optional
    "event_name": "sumon", //requerd
    "is_event_virtual": false, //requerd by default created false
    "list_of_interest": [], //optional
    "event_description": "event event_description", //requerd
    "notify_members": false, //requerd by default created false
    "preset": "any thing", //optional
    "user": "61d561c8f53b79810115013e",
}),

 })
    .then(res => res.json())
    .then(data => console.log(data))

```

#### event geting current user data Api url link: http://localhost:5000/api/events/:id

### make sure user id pass

### Geting Event Example: user="23423423darrarw3a32":

```
fetch(`http://localhost:5000/api/events/:id`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    }
    .then(res => res.json())
    .then(data => console.log(data))
})

```

#### event update current user data Api url link: http://localhost:5000/api/events/update/:id

### make sure \_id pass

#### update Event Example: \_id:objectId(234234dfiherhi432) :

```
fetch(`http://localhost:5000/api/events/update/:id`,{
    method:'PUT',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    },
    body: JSON.stringify(data) //need edit data change to updated
    .then(res => res.json())
    .then(data => console.log(data))
})

```

#### event delete current user data Api url link: http://localhost:5000/api/events/delete/:id

### make sure \_id pass

#### delete Event Example: \_id:objectId(234234dfiherhi432) :

```
fetch(`http://localhost:5000/api/events/delete/:id`,{
    method:'DELETE',
    headers:{
        'Content-Type': 'application/json'
        'authorization': `Bearer ${token}`  //requerd
    },
    .then(res => res.json())
    .then(data => console.log(data))
})

```

# millenivision-server-side

# milleni_server

# milleni_server
