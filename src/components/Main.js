require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom')
//get imageData information
var imageData = require('../data/imageData.json');


//transfer imageData description to imageURL
imageData = (function genImageURL(imageDataArr){
  for(var i = 0; i < imageDataArr.length; i++) {
    var temp = imageDataArr[i];
    temp.imageURL = require('../images/' + temp.filename);
    imageDataArr[i] = temp;
  }
  return imageDataArr;
})(imageData);

//console.log(imageData);

class ImgFigure extends React.Component {
  render() {
    return(<figure className="img-figure">
        <img src = {this.props.data.imageURL} alt = {this.props.data.title}/>
        <figurecaption>
          <h2 className = "img-title">{this.props.data.title}</h2>
        </figurecaption>
      </figure>
    );
  }
}



//class AppComponent extends React.Component {
var AppComponent = createReactClass({
  Constant: {
      centerPos: {
        left: 0,
        right: 0
      },
      //horizontal position range
      hPosRange: {
        leftSecX: [0, 0],
        rightSecX:[0,0],
        y: [0,0]
      },
      vPosRange: {
        x:[0,0],
        topY:[0,0]
      }
  },
  //rearrage all figure's position
  rearrange: function(centerIndex) {
    return {
      imgArrangeArr: [
        {
          pos:{
            left
          }
        }
      ]
    };
  },
  getInitialStage: function() {

  },
  componentDidMount: function () {
    //get stage size
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
    stageW = stageDOM.scrollWidth,
    stageH = stageDOM.scrollHeight,
    halfStageW = Math.ceil(stageW / 2),
    halfStageH = Math.ceil(stageH / 2);

    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
    imgW = imgFigureDOM.scrollWidth,
    imgH = imgFigureDOM.scrollHeight,
    halfImgW = Math.ceil(imgW / 2),
    halfImgH = Math.ceil(imgH / 2);

    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //top
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);
  },
    
  render() {
    var controllerUnits = [],
    imgFigure = [];
    imageData.forEach((element,index) => {
      imgFigure.push(<ImgFigure key = {element.imageURL} data={element} ref={'imgFigure' + index}/> );
    });
    //console.log(imgFigure);
    return (
      <section className = "stage" ref="stage">
        <section className = "img-sec">
          {imgFigure}
        </section>
        <nav className = "controller-nav">
          {controllerUnits}
        </nav>
      </section>

    );
  }
})

AppComponent.defaultProps = {
};

export default AppComponent;

