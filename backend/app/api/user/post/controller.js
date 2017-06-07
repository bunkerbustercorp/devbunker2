const Post = require('./../../../models/Post');
const User = require('./../../../models/User');
const Joi = require('joi');
const _ = require('lodash');

module.exports = {
    create: async (ctx, next) => {

        // 스키마 검사
        const schema = {
            title: Joi.string().required(),
            content: Joi.string().required(),
            isTemp: Joi.boolean().required()
        };

        const validate = Joi.validate(ctx.request.body, schema);

        if(validate.error) {
            ctx.status = 400;
            ctx.body = {
                message: 'validation failure'
            }
            return;
        }
        
        const { 
            title,
            content,
            isTemp,
        } = ctx.request.body;

        const userId = ctx.request.userId;

        try {
            // 먼저 데이터를 생성한다.
            const post = await Post.create({
                title,
                content,
                isTemp,
                userId
            });

            const postId = post._id;

            // 성공시...
            ctx.status = 201;
            ctx.body = {
                postId: postId,
                isTemp
            }; 

        } catch (e) {
            console.log(e);
            ctx.status = 400;
            ctx.body = {
                message: 'error occurred'
            };
        }
    },

    update: async (ctx, next) => {
        /*
            Update 종류:
                1. 임시저장인걸 임시저장
                2. 임시저장인걸 공개
                3. 공개한걸 수정
                4. 공개한걸 임시저장 [나중에 구현]
            NOTE:
                id 로 찾아서, 현재 isTemp 값 불러온다음에 이번요청의 isTemp 랑 비교해서 
                    - prev.isTemp === isTemp 
                        - 1) isTemp
                        - 2) !isTemp
                    - prev.isTemp && !isTemp
        */


        // 스키마 검사

        const { postId } = ctx.params;

        const schema = {
            title: Joi.string().required(),
            content: Joi.string().required(),
            isTemp: Joi.boolean().required()
        };

        const validate = Joi.validate(ctx.request.body, schema);
        
        if(validate.error) {
            ctx.status = 400;
            ctx.body = {
                message: 'validation failure'
            }
            return;
        }
        
        const { 
            title,
            content,
            isTemp
        } = ctx.request.body;


        const userId = ctx.request.userId;

        // id 로 post를 찾기

        const prev = await Post.findById(postId)

        // 포스트가 존재하지 않는다면 끝낸다.
        if(!prev) {
            ctx.status = 403;
            ctx.body = {
                message: 'post not found'
            };
            return;
        }

        // 만약에, 포스트의 userId 와 , 현재의 userId 가 다르다면, 끝낸다
        if(prev.userId !== userId) {
            ctx.status = 401;
            ctx.body = {
                message: 'no permission to post'
            }
            return;
        }

        prev.title = title;
        prev.content = content;

        await prev.save();

        try {
            ctx.body = {
                postId,
                isTemp
            };
            
        } catch (e) {
            console.log(e);
            ctx.status = 400;
            ctx.body = {
                message: 'error occurred'
            };
        }
    }
}