### React Beast Modal Usage

1. In your root index.js (or whatever you call it) file

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import ModalProvider from 'react-beast-modal';

import App from './App';
import Home from './home';

/*****************************************************
 ** create a configuration variable ******************
 *****************************************************/

const modalConfig = {
  backdropStyle: { // defaults to empty object
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  modalContainerStyle: { //default to empty object
    borderRadius: '2px'
  },
  closeOnBackdropClick: true // default is false
}

/*****************************************************
 ** wrap the outermost component in the modal provider
 *****************************************************/

ReactDOM.render(
  <div>
    <ModalProvider configuration={modalConfig}>
      <App>
        <Home/>
      </App>
    </ModalProvider>
  </div>, 
  document.getElementById('root')
);

```

2. In any component you want to use the modal, import the `withBeastModal` HOC (Higher Order Component)

```javascript
// home.js
import React from 'react';
// withBeastModal is a HOC that adds a function `toggleBeastModal` to the props
import { withBeastModal } from 'react-beast-modal';

import WelcomeModal from './welcomeModal';

class Home extends React.Component {
  showWelcomeModal = () => {
    // toggleBeastModal takes an object with two props
    // isVisible (boolean): default is false
    // modalContent (react element):
    this.props.toggleBeastModal({ 
      isVisible: true,
      modalContent: (
        <WelcomeModal/>
      )
    })
  }
  
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <button onClick={this.showWelcomeModal}>Click me</button>
      </div>
    );
  }
}

// pass the component to the `withBeastModal` HOC
export default withBeastModal(Home);
```