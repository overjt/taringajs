[![npm version](https://badge.fury.io/js/taringajs.svg)](http://badge.fury.io/js/taringajs) [![GitHub version](https://badge.fury.io/gh/overjt%2Ftaringajs.svg)](http://badge.fury.io/gh/overjt%2Ftaringajs)

#TaringaJS

Taringa + nodejs


Para instalar en su proyecto:
```bash

npm install taringajs --save

```
##Ejemplos
Todos los ejemplos tienen el siguiente encabezado
```javascript
var t = require('taringajs');
var taringa = new t('USERNAME', 'PASSWORD');
```

###Hacer un Shout
* Texto
```javascript
taringa.shout.add("Test - #NodeJS");
```
* Imagen
```javascript
taringa.shout.add("Test image", 1, 0, "http://k33.kn3.net/taringa/9/2/3/6/7/8//djtito08/9B4.jpg"); //La url debe ser de kn3
```
* Video
```javascript
taringa.shout.add("Test video", 2, 0, "https://www.youtube.com/watch?v=l7Fi8-7HRhc");
```
* Link
```javascript
taringa.shout.attach_link("http://coffeescript.org/", function(err, data) {
  if (err) {
    return console.log(err);
  }
  return taringa.shout.add("Test link", 3, 0, data);
});
```

###Comentar un shout
```javascript
taringa.shout.add_comment("Hola",60544255,19963011,"shout");
```

###Dar "Me gusta" a un shout
```javascript
taringa.shout.like(60544255,19963011);
```

###Obtener los datos de un shout utilizando el id
```javascript
taringa.shout.get_object(60544255, function(err, data) {
    if (err) {
        return console.log(err);
    }
    console.log(data);
});
```

###Importar una imagen a kn3
```javascript
taringa.kn3.import("https://i.imgur.com/s8yBeZ8.png", function(err, data) {
    if (err) {
        return console.log(err);
    }
    console.log(data);
});
```

###Obtener los datos de un usuario según el nick
```javascript
taringa.user.get_user_id_from_nick("overjt", function(err, data) {
    if (err) {
        return console.log(err);
    }
    console.log(data);
});
```

###Seguir a un usuario
```javascript
taringa.user.follow(19963011);
```

###Dejar de seguir a un usuario
```javascript
taringa.user.unfollow(19963011);
```

###Dar favorito a un shout
```javascript
taringa.shout.fav(60544255,19963011);
```


###Obtener el último MP
```javascript
taringa.message.getLast(function(err, data) {
    if (err) {
        return console.log(err);
    }
    console.log(data);
});
```

###Obtener un MP por ID
```javascript
taringa.message.get(1324344, function(err, data) {
    if (err) {
        return console.log(err);
    }
    console.log(data);
});
```
Todos los ejemplos están en el archivo `test/test.js`



##TODO
* Comentar el código
* Añadir funcionalidades para los post





