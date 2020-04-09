import React, { Component } from "react";

import firebase from "firebase";

import FileUploader from "react-firebase-file-uploader";
import { withAuthorization } from "../Session";

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      photo: "",
      isUploading: false,
      progress: 0,
      photoURL: "",
      loading: false,
      users: [],
    };
  }

  handleChangeUsername = (event) =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = (progress) => this.setState({ progress });
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = (filename) => {
    this.setState({ photo: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ photoURL: url }));
  };

  render() {
    return (
      <div>
        <form>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.photoURL && <img src={this.state.photoURL} />}
          <FileUploader
            accept="image/*"
            name="image-uploader-multiple"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            multiple
          />
        </form>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(LandingPage);
