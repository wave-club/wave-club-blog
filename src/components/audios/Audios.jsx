import './Audios.scss'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import AudiosList from './audios-list/AudiosList'
import {Card} from 'antd'

const gridStyle = {
    width: '33%',
    textAlign: 'center',
}

class Audios extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

        var onOff=true;
        $(".btn").click(function(){
            if(onOff)
            {
                $(".btn").get(0).src="https://raw.githubusercontent.com/976500133/FETopic/master/src/fetopic-assets/images/pause.png";
                $("#myMusic").get(0).play();
                $(".run").addClass("rotate");
                $(".star").addClass("rotate");
            }
            else
            {
                $(".btn").get(0).src="https://raw.githubusercontent.com/976500133/FETopic/master/src/fetopic-assets/images/play.png";
                $("#myMusic").get(0).pause();
                $(".run").removeClass("rotate");
                $(".star").removeClass("rotate");
            }
            onOff=!onOff;
        });
        var na=new Array();//歌手
        na[0]="陈淑桦 ";
        na[1]="周杰伦";
        na[2]="李行亮";
        var ng=new Array();//歌名
        ng[0]="笑红尘";
        ng[1]="青花瓷";
        ng[2]="愿得一人心";
        var n=0;

        let basePath = 'https://raw.githubusercontent.com/976500133/FETopic/master/src/fetopic-assets/audios/'
        let VIDEOS = [
            basePath + '0.mp3',
            basePath + '03a403062a3c20cf65fc4a1afb14d541.mp3',
            basePath + '0cb4a963a6e3a8c45737c9592b5f2cfb.mp3',
            basePath + '256ea8fbbc6a53bb862ae89315adc9cf.mp3',
            basePath + '264f196a7b8507e91d9311cf805b2511.mp3',
            basePath + '1.mp3',
            basePath + '340939f9bbf346ef4e44e6c616820f0c.mp3',
            basePath + '465d88328c3a971ebe16b1e46b328ac2.mp3',
            basePath + '67369d4e30690bb4ee30b10984284036.mp3',
            basePath + '7fa353297612aabe15b1f0ed9aed1889.mp3',
            basePath + '91e3211e1026890db15d1e3990e179f2.mp3',
            basePath + '984820ba31b01d6ff9c46f6253be65f6.mp3',
            basePath + 'bf38a39da75c7523bcade28782effc7c.mp3',
            basePath + 'e26742890350af54d25c21c19a8ac547.mp3',
            basePath + 'f512b61d4d69371280dd64d14faf74f4.mp3',

        ]
        $(".next").click(function()
        {
            n++;
            if(n>VIDEOS.length)
            {
                n=0;
            }
            $("#myMusic").attr('src',VIDEOS[n]);
            $(".star").attr('src','https://raw.githubusercontent.com/976500133/FETopic/master/src/fetopic-assets/images/'+n+'.jpg');
            $(".singer").html(na[n]);
            $(".song").html(ng[n]);
            $(".btn").get(0).src="https://raw.githubusercontent.com/976500133/FETopic/master/src/fetopic-assets/images/pause.png";
            $("#myMusic").get(0).play();
            $(".run").addClass("rotate");
            $(".star").addClass("rotate");
            onOff=false;
        });
        $(".love").click(function()
        {
            alert("开发中！");
        })

    }


    render() {
        return (
            <div className="audios">
                <div id="box">
                    <div className="circle">
                        <img src="https://raw.githubusercontent.com/976500133/FETopic/master/src/fetopic-assets/images/yyjd2.png" className="run"/>
                        <p className="singer">陈淑桦</p>
                        <p className="song">笑红尘</p>
                        <div>
                            <img src="https://raw.githubusercontent.com/976500133/FETopic/master/src/fetopic-assets/images/0.jpg" className="star" height="120px" width="120px" alt="陈淑桦"/>
                            <img src="https://raw.githubusercontent.com/976500133/FETopic/master/src/fetopic-assets/images/play.png" className="btn" alt="开始" />
                        </div>
                        <p className="love">好听</p>
                        <p className="next">切歌</p>
                    </div>
                </div>
                <audio src='../../fetopic-assets/audios/0.mp3' id="myMusic" />

            </div>
        )
    }

}

const mapDispatchToProps = () => {
    return {}
}

export default connect(null, mapDispatchToProps)(Audios)
