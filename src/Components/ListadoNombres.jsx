import React, {useState} from 'react'
import uniqid from 'uniqid'

// Funcion para agregar nuevos nombre capturandolo en el
//useState y con una id unica con uniqid cuando se presione
//el boton submit con el metodo onSubmit

const ListadoNombres = () => {

    const [nombre, setNombre] = useState('')
    const [listaNombres, setlistaNombres] = useState([])
    const [modoEdicion, setmodoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)
    
    
    const addNombre = (e) =>{
        e.preventDefault()
        if(!nombre.trim()){
            setError('el campo nombre esta vacio')
            return
        }
        const nuevoNombre = {
            id:uniqid(),
            tituloNombre:nombre
        }
        setlistaNombres([...listaNombres, nuevoNombre])
        setNombre('')
        setError(null)
    }
    const deleteNombre = (id) =>{
        const nuevoArray = listaNombres.filter( item => item.id !== id)
        setlistaNombres(nuevoArray)
    }
    const editar = (item) =>{
        setmodoEdicion(true)
        setNombre(item.tituloNombre)
        setId(item.id)
    }
    const editarNombre = (e) =>{
        e.preventDefault()
        const NuevoArray = listaNombres.map( item => item.id === id ? {id:id, tituloNombre:nombre}: item)
        setlistaNombres(NuevoArray)
        setmodoEdicion(false)
        setNombre('')
    }





    return (
        <div>
            <h2>Aplicación Crud Básica</h2>
            <div className="row">
                <div className="col">
                    <h2>Listado de nombres</h2>
                    <ul className="list-group">
                        {
                            listaNombres.map( item =>
                                <li key="{item.id}" className="list-group-item">
                                    {item.tituloNombre}
                                <button
                                    className="btn  btn-danger float-right"
                                    onClick={ () => {deleteNombre(item.id)} }
                                >
                                    BORRAR
                                 </button>

                                 <button
                                    className="btn  btn-info float-right"
                                    onClick={ () => {editar(item)} }
                                >
                                    EDITAR
                                 </button>
                                
                                </li>
                                )
                        }
                    </ul>
                </div>
                <div className="col">
                    <h2>Formulario para añadir nombres</h2>
                    <form onSubmit={modoEdicion ? editarNombre : addNombre} className="form-group">
                        <input 
                                onChange= { (e) => {setNombre (e.target.value) } } 
                                className="form-control mb-3" 
                                type="text" 
                                placeholder="Introduce tu nombre"
                                value={nombre}
                        />
                        <input  
                                className="btn btn-info btn-block" 
                                type="submit" 
                                value={modoEdicion ? 'EDITAR NOMBRE' :  'RESGISTRAR NOMBRE'}
                        />
                    </form>
                    {
                        error != null ? (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        ):
                        (
                            <div></div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}


export default ListadoNombres