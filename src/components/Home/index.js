import React, { Component } from "react";
// import { render } from "react-dom";
import Gallery from "react-photo-gallery";
// import { photos } from "./photos";

import firebase from "firebase";

class BasicRows extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      photos: [],
    };
  }

  componentDidMount() {
    this.getPhotos();
    this.setState({ loading: false });
    console.log(this.state.photos);
  }

  getPhotos() {
    let photos = [...this.state.photos];

    const storageRef = firebase.storage().ref();
    const imagesRef = storageRef.child("images");
    imagesRef.listAll().then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((urlString) => {
          let url = urlString;
          photos = [...photos, { src: url, width: 4, height: 3 }];
          this.setState({ photos });
        });
      });
    });
  }

  render() {
    const { loading, photos } = this.state;
    return (
      <div>
        {loading && <div>Loading...</div>}
        <Gallery photos={photos} />
      </div>
    );
  }
}

export default BasicRows;
