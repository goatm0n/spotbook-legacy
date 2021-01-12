class Navbar extends React.Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                    <a class="navbar-brand" href='http://127.0.0.1:8000/spotbook/'>Home</a>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href='#'>Spotmap</a>
                        </li>
                        <li class='nav-item'>
                            <a class='nav-link' href='#'>Spotfeed</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

const domContainer = document.querySelector('#navbar-container')
ReactDOM.render(<Navbar />, domContainer)