import "./index.css"

function Plans () {
 return (
    <div className="container-plan">
        <div className="list-plans">
            <nav className="nav-plans">
                <ul>
                    <li className="plan-free">
                        <div className="intro-plan">
                            <span className="name-plan-free">Free</span>
                            <span className="price-plan-free">R$</span>
                            <hr className="line-horiz"/>
                        </div>
                    </li>
                    <li className="plan-premium">
                        <div className="intro-plan">
                            <span className="name-plan-basic">Basic</span>
                            <span className="price-plan-basic">R$</span>
                            <hr className="line-horiz"/>

                        </div>

                    </li>
                    <li className="plan-pro">
                        <div className="intro-plan">
                            <span className="name-plan-premium">Premium</span>
                            <span className="price-plan-premium">R$</span>
                            <hr className="line-horiz"/>


                        </div>

                    </li>
                </ul>
            </nav>
        </div>
    </div>
 )
}


export default Plans;