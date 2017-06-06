import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router';

import * as leftbarmenuActions from 'redux/modules/base/leftbarmenu';
import * as write from 'redux/modules/write';

import Container from 'components/Common/Container';
import { LeftBar, LeftBarMenu, LeftBarMenuSubs } from 'components/Base/LeftBar';
import { WriteComponent } from 'components/Write/Editor';
import { 
    Rightbar,
    Box,
    TagInput,
    TagContainer,
    VisibilityOption,
    Category,
    ImageUploadButton
} from 'components/Write/Rightbar';

class WritePage extends Component {
    handleMenu = (() => {
        const { LeftbarMenuActions } = this.props;
        return {
            setActive: (activeMenu) => {
                LeftbarMenuActions.activeMenu(activeMenu);
            }
        }
    })()

    handleCategory = (() => {
        const { WriteActions } = this.props;

        return {
            get: () => {
                WriteActions.getCategory();
            },
            create: () => {
                WriteActions.createCategory("새 카테고리");
            },
            move: ({parentId, index, id}) => {
                WriteActions.moveCategory({parentId, index, id})
            },
            delete: (id) => {
                WriteActions.deleteCategory(id);
            },
            rename: ({id, name}) => {
                WriteActions.renameCategory({id, name})
            },
            toggle: (index) => {
                WriteActions.toggleCategory(index);
            }
        }
    })()

    handleTag = (() => {
        const { WriteActions } = this.props;

        return {
            changeInput: (text) => {               
                WriteActions.changeTagInput(text)
            },
            insert: (text) => {

                // 체크 
                const check = (t) => {
                    const list = this.props.status.write.getIn(['tags', 'list']);
                    const exists = list.filter(item => item.toLowerCase() === t.toLowerCase()).size > 0;

                    return exists;
                }

                // 태그에 쉼표가 있다
                if(text.indexOf(',')>0) {
                    const tags = text.split(',');
                    tags.forEach(
                        item => {
                            // 중복하는 경우 스킵
                            if(check(item)) return;
                            if(item === '' || item.trim() === '') return;

                            // 앞뒤에 space 있는경우 없앰 
                            WriteActions.insertTag(item.trim());
                        }
                    );
                } else {
                    // 존재시 스킵
                    if(check(text)) return;

                    WriteActions.insertTag(text.trim());
                }
            },
            remove: (index) => {
                WriteActions.removeTag(index)
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
            },
            setVisibility: (value) => {
                // 포스트 공개/비공개 설정
                WriteActions.setVisibility(value);
            }
        }
    })()

    handleModal = (() => {
        const { ModalActions } = this.props;
        return {
            open: ({modalName, data}) => {
                ModalActions.openModal({modalName, data});
            },
            close: (modalName) => {
                ModalActions.closeModal(modalName);
            },
            setError: (modalName) => {
                return (error) => ModalActions.setError({modalName, error});
            },
            setOption: (modalName) => {
                return ({optionName, value}) => ModalActions.setOption({modalName, optionName, value});
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
                
                const categories = write.getIn(['category', 'flat'])
                                    .filter(category=>category.get('value'))
                                    .map(category=>category.get('id'))
                                    .toJS();
                
                const tags = write.getIn(['tags', 'list'])
                              .toJS();
                
                
                const payload = {
                    title: editor.get('title'),
                    content: editor.get('markdown'),
                    visibility: editor.get('visibility'),
                    isTemp,
                    categories,
                    tags
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
    })()
    render() {
        const { status: { header, leftbarmenu, write } } = this.props;
        const { handleMenu, handleEditor, handlePost, handleModal, handleTag, handleCategory  } = this;

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
                <WriteComponent
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
                </WriteComponent>
                <Rightbar
                    tags={write.get('tags')}
                    category={write.get('category')}
                >
                    <ImageUploadButton/>
                    <Box title="태그">
                        <TagInput value={write.getIn(['tags', 'input'])} onChange={handleTag.changeInput} onInsert={handleTag.insert}/>
                        <TagContainer tags={write.getIn(['tags', 'list'])} onRemove={handleTag.remove}/>
                    </Box>
                    <Box title="공개 설정">
                        <VisibilityOption onChange={handleEditor.setVisibility}/>
                    </Box>
                    <Box title="카테고리">
                        <Category 
                            category={write.getIn(['category', 'flat'])} 
                            onConfigure={()=>handleModal.open({modalName: 'category'})} 
                            onToggle={handleCategory.toggle}
                        />
                    </Box>

                </Rightbar>
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