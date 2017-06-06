import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router';

import * as leftbarmenuActions from 'redux/modules/base/leftbarmenu';
import * as write from 'redux/modules/write';

import Container from 'components/Common/Container';
import { LeftBar, LeftBarMenu, LeftBarMenuSubs } from 'components/Base/LeftBar';
import { EditorComponent } from 'components/Write/Editor';

import Alert from 'react-alert';

class WritePage extends Component {
    handleMenu = (() => {
        const { LeftbarMenuActions } = this.props;
        return {
            setActive: (activeMenu) => {
                LeftbarMenuActions.activeMenu(activeMenu);
            }
        }
    })()

    handleEditor = (() =>{
        const { WriteActions } = this.props;

        return {
            changeTitle: (title) => {
                WriteActions.changeTitle(title);
            },
            changeMarkdown: (markdown) => {
                WriteActions.changeMarkdown(markdown);
            },
            setFullscreen: (value) => {
                WriteActions.setFullscreen(value);
            },
            setScrollPercentage: (value) => {
                WriteActions.setScrollPercentage(value)
            },
            setIsLastLine: (value) => {
                WriteActions.setIsLastLine(value);
            }
        }
    })()

    handlePost = (() => {
        const { WriteActions } = this.props;

        return {
            save: (isTemp) => {
                const { status: { write } } = this.props;

                const postId = write.getIn(['workingPost', 'postId']);
                const editor = write.get('editor');

                if(!editor.get('title')) {
                    this.msg.show('제목을 입력해 주세요', {
                        time: 2000,
                        type: 'success',
                    })
                }
                else if(!editor.get('markdown')){
                    this.msg.show('내용을 입력해 주세요', {
                        time: 2000,
                        type: 'success',
                    })
                } else {
                    const payload = {
                        title: editor.get('title'),
                        content: editor.get('markdown'),
                        isTemp
                    }

                    if(!postId) {
                        // 포스트 아이디가 존재하지 않는 경우에는
                        // 게시글을 새로 작성한다
                        return WriteActions.createPost(payload);
                    } else {
                        // 포스트 아이디가 이미 존재하는 경우에는
                        // payload 에 postId 넣고, updatePost 를 호출
                        payload.postId = postId;
                        return WriteActions.updatePost(payload);
                    }
                }
            }
        }
    })()

    alertOptions = {
        offset: 14,
        position: 'top right',
        theme: 'light',
        time: 5000,
        transition: 'scale'
    }

    render() {
        const { status: { header, leftbarmenu, write } } = this.props;
        const { handleMenu, handleEditor, handlePost  } = this;

        const activemenu = leftbarmenu.get('activemenu');
        return (
            <Container>
                <LeftBar visible={header.get('leftbar')}>
                    <LeftBarMenu 
                        ItemID="1"
                        active={activemenu}
                        text="BunkerBuster"
                        onClick={handleMenu.setActive}
                    />
                    <LeftBarMenu
                        ItemID="2"
                        active={activemenu}
                        text="뉴스피드"
                        onClick={handleMenu.setActive}
                    />
                    <LeftBarMenu ItemID="3"
                        active={activemenu}
                        text="인기"
                        onClick={handleMenu.setActive}
                    />
                    <LeftBarMenu
                        ItemID="4"
                        active={activemenu}
                        text="카테고리"
                        onClick={handleMenu.setActive}
                    />
                    <LeftBarMenuSubs className="leftbarmenu-header"
                        ItemID="5"
                        active={activemenu}
                        text="구독"
                        onClick={handleMenu.setActive}
                    />
                    <LeftBarMenuSubs
                        className="leftbarmenu-subs"
                        ItemID="6"
                        active={activemenu}
                        text="JSP 강좌" 
                        count="5" 
                        onClick={handleMenu.setActive}/>
                    <LeftBarMenuSubs
                        className="leftbarmenu-subs"
                        ItemID="7"
                        active={activemenu}
                        text="ReactJS 강좌"
                        count="1"
                        onClick={handleMenu.setActive}/>
                    <LeftBarMenuSubs className="leftbarmenu-subs"
                        temID="8"
                        active={activemenu}
                        text="HTML5 강좌"
                        count="12"
                        onClick={handleMenu.setActive}
                    />
                </LeftBar>
                <EditorComponent
                    onChangeTitle={handleEditor.changeTitle}
                    onChangeMarkdown={handleEditor.changeMarkdown}
                    onSetFullscreen={handleEditor.setFullscreen}
                    onSetScrollPercentage={handleEditor.setScrollPercentage}
                    onSetIsLastLine={handleEditor.setIsLastLine}
                    title={write.getIn(['editor', 'title'])}
                    markdown={write.getIn(['editor', 'markdown'])}
                    fullscreen={write.getIn(['editor', 'fullscreen'])}
                    scrollPercentage={write.getIn(['editor', 'scrollPercentage'])}
                    isLastLine={write.getIn(['editor', 'isLastLine'])}
                    onSave={handlePost.save}
                    isTemp={write.getIn(['workingPost', 'isTemp'])}>
                </EditorComponent>
                <Alert ref={msg => this.msg = msg } {...this.alertOptions}/>
            </Container>
        );
    }
}

// export default App;
export default withRouter(connect(
    state => ({
        status: {
            header: state.base.header,
            leftbarmenu: state.base.leftbarmenu,
            write: state.write
        }
    }),
    dispatch => ({
        LeftbarMenuActions: bindActionCreators(leftbarmenuActions, dispatch),
        WriteActions: bindActionCreators(write, dispatch)
    })
)(WritePage));