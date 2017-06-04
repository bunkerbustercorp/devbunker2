import React, {Component} from 'react';
import Dimmer from 'components/Common/Dimmer';
import EyeCatchy from 'components/Common/EyeCatchy';

class LoginModal extends Component {
    state = {
        closing: false
    }

    componentDidUpdate (prevProps, prevState) {
        // visible 값이 비활성화 되면 closing 값을 true 로 바꾸고
        // 0.7초 이후에 원상복귀한다
        if(prevProps.visible && !this.props.visible) {
            this.setState({
                closing: true
            });

            setTimeout(
                () => {
                    this.setState({
                        closing: false
                    });
                }, 700
            );
        }
    }
    render() {
        const { children, visible, onClick} = this.props;
        const { closing } = this.state;

        if(!closing && !visible) return null;

        const animation = closing ? 'slideUp' : 'slideDown';
        return (
            <div>
                <div className="loginmodal-wrapper">
                    <EyeCatchy onHide={onClick}>
                        <div ref={ref=>{this.modal = ref}} className={`loginmodal ${animation}`}>
                            <div className="loginmodal-exit" onClick={onClick}>✕</div>
                            <div className="loginmodal-logo">DevBunker</div>
                            <div className="loginmodal-description">
                                <p><b>개발자</b>들을 위한 <b>커뮤니티</b>,</p>
                                <p>여러분들도 한번 <b>시작</b>해보세요!</p>
                            </div>
                            <div className="loginmodal-buttons-wrapper">
                                {children}
                            </div>
                        </div>
                    </EyeCatchy>
                </div>
                <Dimmer/>
            </div>
        );
    }
};
export default LoginModal;