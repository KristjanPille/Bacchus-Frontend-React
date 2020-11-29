import React from "react";

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow">
                <a className="navbar-brand" href="/"><b>Bacchus</b></a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:3000/bids" target="_blank">Bids Rest Api</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
};

export default Header;
