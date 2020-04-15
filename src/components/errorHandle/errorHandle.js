import React, {Component} from 'react';


export default class ErrorHandle extends Component{
    constructor(props){
        super(props);
        this.state={
            error:false
        }
    }

    componentDidCatch(error,info){
        this.setState({
            error:true
        })

        console.error(error);
    }

    render(){
        if(this.state.error){
            return (
                <div className="container">
                    <div style={{'textAlign':'center'}}>
                        <h1>Ups, Algo malo ocurrió en el Servidor!! </h1>
                        <img alt="error servidor" src="https://media2.giphy.com/media/qgdjwD7Pk0iaI/giphy.gif?cid=790b76115cedbbdd55754d446b9b87ff&rid=giphy.gif" />
                    </div>
                </div>
            )
        }else{
            return this.props.children;
        }
    }
} 