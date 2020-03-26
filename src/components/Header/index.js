import React, { Component } from 'react';
import { AiOutlineMenu } from "react-icons/ai";

import "./styles.css";

export default class Header extends Component {
    render() {
        return (
            <div>
                <header id="main-header">
                    <div className="dropdown hover">
                        <button><AiOutlineMenu size={30} /></button>
                        <ul>
                            <li><a href="?">Pokemon Habitats</a></li>
                            <li><a href="?">Pokemon Speciest</a></li>
                        </ul>
                    </div>
                    <a href="/">Poké<span>Dex</span></a>
                </header>
            </div>
        );
    }
}
