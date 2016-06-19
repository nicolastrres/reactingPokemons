import React from 'react'
import $ from 'jquery'

export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            passivePokemon: {
                id: props.params.pokemon1,
                name:'',
                moves: []
            },
            activePokemon: {
                id: props.params.pokemon2,
                name: '',
                moves: []
            }
        };
        this.attack = this.attack.bind(this);
    }

    componentDidMount(){
        this.loadPokemonData(this.props.params);
    }

    componentWillReceiveProps(props){
        this.loadPokemonData(props.params);
    }

    loadPokemonData(props){
        var pokemons = require('./../data/pokemon').default;
        let activePokemon = {id: props.pokemon2, lifePoints:100, action:'bounce'};
        let passivePokemon = {id: props.pokemon1, lifePoints:100, action:''};
        $.extend(activePokemon, activePokemon,  pokemons[props.pokemon2]);
        $.extend(passivePokemon, passivePokemon,  pokemons[props.pokemon1]);
        this.setState({
            activePokemon: activePokemon,
            passivePokemon: passivePokemon

        });
    }

    calculateDamage(attackingPokemon, attackedPokemon){
        let MINIMUN_DAMAGE = 5;
        let damage = attackingPokemon.attack - attackedPokemon.defense;
        if(damage<0)
            return MINIMUN_DAMAGE;
        if(attackedPokemon.lifePoints < damage)
            return attackedPokemon.lifePoints;
        return damage;
    }

    attack(){
        let attackingPokemon = this.state.activePokemon;
        let attackedPokemon = this.state.passivePokemon;
        attackingPokemon.action= " attack ";
        attackedPokemon.lifePoints-= this.calculateDamage(attackingPokemon, attackedPokemon);
        this.setState({
            activePokemon: attackingPokemon,
            passivePokemon: attackedPokemon

        });
        setTimeout(() => {
            attackingPokemon.action= "";
            attackedPokemon.action="bounce";
            this.setState({
                passivePokemon: attackingPokemon,
                activePokemon: attackedPokemon
            });
        },2000);
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 ">
                        <div className="stats">
                            <div className="row name-and-level">
                                <div className="col-md-10 ">
                                    {this.state.passivePokemon.name}
                                </div>
                                <div className="col-md-2 text-right">
                                    Lv18
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-1">
                                    <img width="30px" src="https://cdn4.iconfinder.com/data/icons/simply-8-bits-9/100/pokeball.png"/>
                                </div>
                                <div className="col-md-1">
                                    <label>HP</label>
                                </div>
                                <div className="col-md-10">
                                    <div className="life-bar" style={{width: this.state.passivePokemon.lifePoints + '%'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 portrait">
                        <img className={this.state.passivePokemon.action} src={"http://pokeapi.co/media/sprites/pokemon/"+this.state.passivePokemon.id+".png"}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6  portrait back">
                        <img className={this.state.activePokemon.action} src={"http://pokeapi.co/media/sprites/pokemon/back/"+this.state.activePokemon.id+".png"}/>
                    </div>
                    <div className="col-md-6">
                        <div className="stats ">
                            <div className="row name-and-level">
                                <div className="col-md-10 ">
                                    {this.state.activePokemon.name}
                                </div>
                                <div className="col-md-2 text-right">
                                    Lv18
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-1">
                                    <img width="30px" src="https://cdn4.iconfinder.com/data/icons/simply-8-bits-9/100/pokeball.png"/>
                                </div>
                                <div className="col-md-1">
                                    <label>HP</label>
                                </div>
                                <div className="col-md-10">
                                    <div className="life-bar" style={{width: this.state.activePokemon.lifePoints + '%'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row ">
                    <div className="attacks col-md-7">
                        {this.state.activePokemon.moves.map((move)=>{
                            return (
                                <div className="col-md-6" onClick={this.attack} key={this.state.activePokemon.id + "-" + move} >
                                    {move}
                                </div>
                            )
                        })}
                    </div>
                    <div className="attacks col-md-3 ">
                        <div className="col-md-1">
                            Power
                        </div>
                        <div className="text-right col-md-10">
                            {this.state.activePokemon.attack}
                        </div>
                        <div className="col-md-10">
                            Defense:  {this.state.activePokemon.defense}
                        </div>
                    </div>
                </div>

            </div>
        )
    }


}