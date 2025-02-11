Dado que en esta práctica vamos a refactorizar la app del módulo pasado, lo primero es copiar la app en la carpeta actual

Estoy leyendo que lo primero es instalar redux-toolkit
    el comando es :
    npm install @reduxjs/toolkit

    dentro de src creamos la carpeta State con el archivo products.slice.js
        dentro del archivo vamos a crear la función productsSlice y le asociamos el método createSlice
            ahora definimos el nombre del slice y le asignamos un estado inicial al contenedor de los prouductos, llamado products
        
        abrimos unas llaves donde irán los reducers, en nuestro proyecto tenemos algunas funciones extra, como abrir y cerrar el carrito
        o validar si hay más productos del mismo tipo ya agregados
            pero en general los reducer son:
                añadir al carrito
                remover del carrito
                toggle cart
        los transcribimos con el prefijo Product

        ahora vamos a exportar los reducers
        para ello vamos a exportar un const con un destructury de los actions, y los reducers
    corregimos algunos errores con la forma en que se llamaba el contenedor de estado en la versión pasada, ahora se llama products
        estos errores estaban en los reducers y en que el array lo estabamos inicializando como null, basado en el ejemplo de la clase


    ahora vamos a mover la carpeta app fuera de components y dentro de src, recuerda actualizar los imports del index
        le cambiamos el nombre a app, con minúscula,porque ya no es un componente
        actualizamos el nombre del archivo App.js a index 

    enseguida, vamos a hacer es quitar el store, eliminando la carpeta
        Ahora dentro la carpeta app, vamos a crear un file llamado store.js
        dentro irá toda la configuración de nuestra store
         en store definimos la constante store y le asignamos el valor configureStore

una vez configurada la store, vamos a importarla en el índice principal, actualizando el import en ese archivo

Ahora tenemos que actualizar los imports de los dispatch en cada componente
y traducir la parte anterior de los actions a la nueva presentación en slice

tambien actualizamos los imports de los componentes en el index de la carpeta app

hemos corregido algunos errores de coherencia al acceder a las propiedades utilizando la consola

Ahora vamos a manejar la asincronía del consumo de la API
    Para manejar la asincronía en Redux toolkit vamos a utilizar la función createAsynThunk
    esta función maneja las solicitudes y las actualizaciones de estado

    a función mencionada arriba la vamos a manejar desde los slices

    vamos a crear un createAsynThunk que vamos a nombrarlo conforme a lo que vamos a hacer
    en este caso fetchProducts
        createAsyncThunk() lleva dos parámetros, el primero es el nombre del Thunk o función, le vamos a llamar products/fetchProducts
        el segundo es la funcion asíncrona
            importamos axios y establecemos el try catch con el uso de axios

    en createAsyncThunk vamos a manejar tres estados que van a manejar el ciclo de la operación asíncrona y esos estados los vamos a reflejar en el slice
        entonces creamos una nueva tasksSlice llamada extraReducers
            //builder nos va a ayudar a hacer los casos de acción

        son tres casos de una solicitud asíncrona
            pending -- se está ejecutando la operación
            fulfilled -- el momento en que se completa la operación asíncrona y se han recibido los datos
            rejected -- falla la solicitud y se está recibiendo un error

        dentro de builder añadimos tres casos basados en los tres casos mencionados
            estos casos llevan el fetchProducts.casoactual (state, action) y una función
        
        exportamos el createAsyncThunk
        lo vamos a utilizar en productsList
        //usamos useEffect para manejar la asincronicidad y añadimos la dependencia dispatch
    
    --Ahora necesitamos manejar algunos estados locales para que los componentes se enteren de en que estado estan
pues los estados  que manejamos anteriormente son para Redux, ahora necesitamos unos para los componentes

    para ello vamos a agregar un nuevo key en los slices, para definir el status, será status: 'idle'


    vamos a manejar 4 estados para que nuestros componentes entiendan en que estado está la solicitud asíncrona
    hay 4 estados:
        idle: cuando no hay ninguna solicitud en curso.

        loading: cuando una solicitud está en proceso.

        succeeded: cuando la solicitud se ha completado con éxito.

        failed: cuando la solicitud ha fallado.

        vamos a crear algunas constantes para cada estado
        estos estados los vamos a mover a un nuevo archivo en el folder state, llamado status.js

        ahora actualizamos el key del slice  status para que import IDLE

    ahora nos vamos a productsList
    importamos las constantes IDLE, succeeded etc
        usamos un useSelector para manejar el status

        en el return vamos a hacer algunas validaciones con objetos

        en el useEffect, hacemos una validación con && para validar que cuanto status sea IDLE se haga el fetch


---Nota---------------------------

En React, las llaves {} se usan dentro del JSX para indicar que quieres evaluar una expresión de JavaScript, por eso tenemos llaves en el return

        continuamos en productsList, donde añadimos un objeto que valide si status está en loading, y si es cierto diga cargando tareas
        recordemos asignar LOADING a pending, debajo del console log para que se actualice, eso se hace en taskSlice

