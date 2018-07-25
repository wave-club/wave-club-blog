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
        $(".next").click(function()
        {
            n++;
            if(n>2)
            {
                n=0;
            }
            $("#myMusic").attr('src','music/'+n+'.mp3');
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
            alert("感谢支持！");
        })

    }


    render() {
        return (
            <div className="audios">
                <div id="box">
                    <div className="circle">
                        <img src="https://raw.githubusercontent.com/976500133/FETopic/master/src/fetopic-assets/images/yyjd.png" className="run"/>
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
