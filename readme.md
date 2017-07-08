#Mesas AVE

> API REST para la aplicación Mesas AVE. A continuación se describen todos los servicios que ofrece el API.

> [http://mesasave.herokuapp.com/api/v1](http://mesasave.herokuapp.com/api/v1)


##Listado de servicios

- [GET stations](#markdown-header-get-stations)
- [GET stations/[id]](#markdown-header-get-stationsid)

- [GET tables[querystring]](#markdown-header-get-tables)
- [GET tables/[id]](#markdown-header-get-tablesid)
- [POST tables](#markdown-header-post-tables)
- [PUT tables/[id]](#markdown-header-put-tablesid)
- [DELETE tables/[id]](#markdown-header-delete-tablesid)

- [GET users](#markdown-header-get-users)
- [GET users/[id]](#markdown-header-get-usersid)
- [POST users](#markdown-header-post-users)
- [PUT users/[id]](#markdown-header-put-usersid)
- [POST users/[id]/rememberPassword](#markdown-header-post-usersidrememberpassword)
- [POST users/login](#markdown-header-post-userslogin)



##Resumen

| Servicio        	              | Descripción                       | Requiere Authorization |
| --------------------------------|:---------------------------------:| ----------------------:|
| GET stations                    | Obtiene todas las estaciones      | No 					   |
| GET stations/[id]                | Obtiene una estación              | No 					   |
| GET tables 		              | Obtiene todas las mesas           | No                     |
| GET tables/[id] 	              | Obtiene una mesa                  | No                     |
| POST tables 	                  | Crea una mesa                     | Sí                     |
| PUT tables/[id] 	              | Actualiza una mesa                | Sí                     |
| DELETE tables/[id]               | Elimina una mesa                  | Sí                     |
| GET users                       | Obtiene todos los usuarios        | No                     |
| GET users/[id]                   | Obtiene un usuario                | No                     |
| POST users 		              | Crea un usuario                   | No                     |
| PUT users/[id] 	              | Actualiza un usuario              | Sí                     |
| POST users/[id]/rememberPassword | Envía un correo con la contraseña | No                     |
| POST users/login 	              | Comprueba los credenciales        | Sí                     |




##Dominio

- `stations`: Estaciones por las que pasan los trenes AVE.
- `tables`: Cada una de las mesas con 4 asientos que se encuentran en los trenes AVE.
- `availablePlaces`: Asientos libres de una mesa.
- `fromDateTime`: Fecha y hora de salida de una mesa.
- `toDateTime`: Fecha y hora de llegada de una mesa.
- `_fromStation`: Estación de origen de una mesa.
- `_toStation`: Estación destino de una mesa.
- `<base64>`: Codificación de las credenciales de un usuario. Por ejemplo, para un usuario con email="Aladin" y password="open sesame" el base64 sería aplicar la codificación base64 a la cadena "Aladin:open sesame", es decir, QWxhZGRpbjpvcGVuIHNlc2FtZQ==
- `querystring`: cadena para filtrar los resultados devueltos por un servicio. Siguen el formato estándar: ?parámetro1=valor1&parámetro2=valor2




##Servicios

### GET stations

__Description:__ Obtiene todas las estaciones.

__URL:__ `http://mesasave.herokuapp.com/api/v1/stations`

__Method:__ `GET`

__Request body:__

	""
__Reponse body:__

	[
	  	{
    		"_id": "550803afe4b018f3e291fff9",
    		"name": "A Albergueria-Prado"
  		},
  		{
    		"_id": "560803afe4b018f3e291fff9",
    		"name": "Alicante"
  		}
	]
	

### GET stations/[id]

__Description:__ Obtiene una estación.

__URL:__ `http://mesasave.herokuapp.com/api/v1/stations/[id]`

__Method:__ `GET`

__Request body:__

	""

__Reponse body:__

	{
		"_id": "550803afe4b018f3e291fff9",
		"name": "A Albergueria-Prado"
	}

### GET tables

__Description:__ Obtiene todas las mesas. Se pueden aplicar filtros mediante Query string. La Query string es opcional.

Para obtener las 100 primeras mesas con 3 plazas disponibles ordenadas por el parámetro `fromDatetime` de forma descencente sería: 

`http://www.mesasave.herokuapp.com/api/v1/tables?availablePlaces=3&skip=0&limit=100&sort=-fromDatetime`.

Si quisiéramos la misma búsqueda pero por orden ascendente habría que cambiar `-fromDatetime` por `fromDatetime`.

El parámetro fromDatetime admite 1 o 2 valores dependiendo de si se quieren obtener las mesas de un día en concreto o las mesas entre un rango de fechas.

Para obtener todas las mesas de una fecha en concreto:

`http://www.mesasave.herokuapp.com/api/v1/tables?fromDatetime=yyyy-MM-ddTHH:mm:ss.mmmZ`.


Para obtener todas las mesas entre un rango de fechas:

`http://www.mesasave.herokuapp.com/api/v1/tables?fromDatetime=yyyy-MM-ddTHH:mm:ss.mmmZ&fromDatetime=yyyy-MM-ddTHH:mm:ss.mmmZ`.


__URL:__ `http://mesasave.herokuapp.com/api/v1/tables[querystring]`

__Method:__ `GET`

__Request body:__

	""

__Reponse body:__

	[
	  	{
    		"_id": "550803afe4b018f3e291fff9",
			"fromDatetime": "2011-05-26T07:56:00.123Z",
			"toDatetime": "2011-05-26T10:56:00.123Z",
			"availablePlaces": 3,
	  		"_fromStation": {
    			"_id": "550803afe4b018f3e291fff9",
				"name": "A Albergueria-Prado"
    		},
			"_toStation": {
    			"_id": "560803afe4b018f3e291fff9",
				"name": "Alicante"
    		},
			"_user": {
				"_id": "500803afe4b018f3e291fff9",
				"name": "Pepe López",
				"email": "pepe@gmail.com",
				"phone": "697123123"
			}
  		},
  		{
    		...another object
  		}
	]

### GET tables/[id]

__Description:__ Obtiene una mesa.

__URL:__ `http://mesasave.herokuapp.com/api/v1/tables/[id]`

__Method:__ `GET`

__Request body:__

	""

__Reponse body:__


  	{
		"_id" : "550803afe4b018f3e291fff9",
		"fromDatetime": "2011-05-26T07:56:00.123Z",
		"toDatetime": "2011-05-26T10:56:00.123Z",
		"availablePlaces": 3,
		"_fromStation": {
			"_id": "550803afe4b018f3e291fff9",
			"name": "A Albergueria-Prado"
		},
		"_toStation": {
			"_id": "560803afe4b018f3e291fff9",
			"name": "Alicante"
		},
		"_user": {
			"_id": "500803afe4b018f3e291fff9",
			"name": "Pepe López",
			"email": "pepe@gmail.com",
			"phone": "697123123"
		}
	}

### POST tables

__Description:__ Crea una mesa.

__URL:__ `http://mesasave.herokuapp.com/api/v1/tables`

__Method:__ `POST`

__Content-type:__ `application/json`

__Authorization:__ `Basic <base64>`

`// <base64> = base64("email:password")`

__Request body:__

  	{
		"fromDatetime": "2011-05-26T07:56:00.123Z",
		"toDatetime": "2011-05-26T10:56:00.123Z",
		"availablePlaces": 3,
		"_fromStation": "550803afe4b018f3e291fff9",
		"_toStation": "560803afe4b018f3e291fff9",
		"_user": "500803afe4b018f3e291fff9"
	}

__Reponse body:__

  	{
		"_id" : "550803afe4b018f3e291fff9",
		"fromDatetime": "2011-05-26T07:56:00.123Z",
		"toDatetime": "2011-05-26T10:56:00.123Z",
		"availablePlaces": 3,
		"_fromStation": {
			"_id": "550803afe4b018f3e291fff9",
			"name": "A Albergueria-Prado"
		},
		"_toStation": {
			"_id": "560803afe4b018f3e291fff9",
			"name": "Alicante"
		},
		"_user": {
			"id": 500803afe4b018f3e291fff9"
			"name": "Pepe López",
			"email": "pepe@gmail.com",
			"phone": "697123123"
		}
	}

### PUT tables/[id]

__Description:__ Actualiza una mesa. Los parámetros que no se envíen no se actualizarán.

__URL:__ `http://mesasave.herokuapp.com/api/v1/tables/[id]`

__Method:__ `PUT`

__Content-type:__ `application/json`

__Authorization:__ `Basic <base64>`

`// <base64> = base64("email:password")`

__Request body:__

  	{
		"fromDatetime": "2011-05-26T07:56:00.123Z",
		"toDatetime": "2011-05-26T10:56:00.123Z",
		"availablePlaces": 2,
		"_fromStation": "550803afe4b018f3e291fff9",
		"_toStation": "560803afe4b018f3e291fff9",
		"_user": "500803afe4b018f3e291fff9"
	}

__Reponse body:__

  	{
		"_id" : "550803afe4b018f3e291fff9",
		"fromDatetime": "2011-05-26T07:56:00.123Z",
		"toDatetime": "2011-05-26T10:56:00.123Z",
		"availablePlaces": 2,
		"_fromStation": {
			"_id": "550803afe4b018f3e291fff9",
			"name": "A Albergueria-Prado"
		},
		"_toStation": {
			"_id": "560803afe4b018f3e291fff9",
			"name": "Alicante"
		},
		"_user": {
			"id": 500803afe4b018f3e291fff9"
			"name": "Pepe López",
			"email": "pepe@gmail.com",
			"phone": "697123123"
		}
	}

### DELETE tables/[id]

__Description:__ Elimina una mesa.

__URL:__ `http://mesasave.herokuapp.com/api/v1/tables/[id]`

__Method:__ `DELETE`

__Request body:__

	""

__Reponse body:__

  	""



### GET users

__Description:__ Obtiene todos los usuarios.

__URL:__ `http://mesasave.herokuapp.com/api/v1/users`

__Method:__ `GET`

__Request body:__

	""
__Reponse body:__

	[
	  	{
			
			"_id": "500803afe4b018f3e291fff9",
			"name": "Pepe López",
			"email": "pepe@gmail.com",
			"phone": "697123123"
  		},
  		{
    		...another object
  		}
	]

### GET users/[id]

__Description:__ Obtiene un usuario.

__URL:__ `http://mesasave.herokuapp.com/api/v1/users/[id]`

__Method:__ `GET`

__Request body:__

	{
		"_id" : "500803afe4b018f3e291fff9"
	}

__Reponse body:__


  	{		
		"_id": "500803afe4b018f3e291fff9",
		"name": "Pepe López",
		"email": "pepe@gmail.com",
		"phone": "697123123"
	}

### POST users

__Description:__ Crea un usuario. Todos los campos son obligatorios.

__URL:__ `http://mesasave.herokuapp.com/api/v1/users`

__Method:__ `POST`

__Content-type:__ `application/json`

__Request body:__

  	{
		"name": "Pepe López",
		"email": "pepe@gmail.com",
		"phone": "697123123",
		"password": "1234"
	}

__Reponse body:__

  	{
  		"_id": "500803afe4b018f3e291fff9",
		"name": "Pepe López",
		"email": "pepe@gmail.com",
		"phone": "697123123",
		"password": "1234"
	}

### PUT users/[id]

__Description:__ Actualiza un usuario. Los parámetros que no se envíen no se actualizarán. Si se quiere cambiar el campo "password" hay que enviar también los parámetros "newPassword" y "repeatNewPassword" y ambos deben coincidir.

__URL:__ `http://mesasave.herokuapp.com/api/v1/users/[id]`

__Method:__ `PUT`

__Content-type:__ `application/json`

__Authorization:__ `Basic <base64>`

`// <base64> = base64("email:password")`

__Request body:__

  	{
		"name": "Pepe López",
		"email": "pepe@gmail.com",
		"phone": "697123123",
		"password": "1234",
		"newPassword": "4321",
		"repeatNewPassword": "4321",
	}

__Reponse body:__

  	{
		"_id": "500803afe4b018f3e291fff9",
		"name": "Pepe López",
		"email": "pepe@gmail.com",
		"phone": "697123123",
		"password": "1234" // este parámetro sólo aparecerá si se ha actualizado el campo "password"
	}

### POST users/[id]/rememberPassword

__Description:__ Envía un correo con la contraseña del usuario.

__URL:__ `http://mesasave.herokuapp.com/api/v1/users/[id]/rememberPassword`

__Method:__ `POST`

__Request body:__

  	""

__Reponse body:__

  	""

### POST users/login

__Description:__ Comprueba si unos credenciales (email/password) son correctos.

__URL:__ `http://mesasave.herokuapp.com/api/v1/users/login`

__Method:__ `POST`

__Authorization:__ `Basic <base64>`

`// <base64> = base64("email:password")`

__Request body:__

  	""

__Reponse body:__

  	{
  		"_id": "500803afe4b018f3e291fff9",
		"name": "Pepe López",
		"email": "pepe@gmail.com",
		"phone": "697123123",
		"password": "1234"
	}