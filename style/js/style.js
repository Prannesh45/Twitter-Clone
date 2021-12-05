/*const { response } = require("express")*/

const URL="http://localhost:3000/tweets"
let page_next_url=null;


const getTwData=(pagenext=false)=>{
    const query=document.getElementById('search-input').value;
    //const url="http://localhost:3000/tweets?q=virat&count=10"
    if(!query) return;
    const ec=encodeURIComponent(query);
    let full_url= `${URL}?q=${ec}&count=10`;
    if(pagenext && page_next_url){
        full_url=page_next_url;
    }
    fetch(full_url).then((response)=>{
        return response.json();
    }).then((data)=>{
        tweetsnew(data.statuses, pagenext);
        page_next_data(data.search_metadata);
        page_2_visibility(data.search_metadata);
    })
}
const enter_on=(x) =>{
    if(x.key=="Enter"){
        getTwData();
    }
}

const tweetsnew = (tweets,pagenext) => {
    let twitterfacts="";
    tweets.map((tweet)=>{
        const newdate1=moment(tweet.created_at).fromNow()
        twitterfacts += `
        <div class="single-tweets">
                        <div class="user-info">
                            <div class="user-profile" style="background-image: url(${tweet.user.profile_image_url_https})">

                            </div>
                            <div class="user-name">
                                <div class="user-name-full">
                                    ${tweet.user.name}
                                </div>
                                <div class="user-username">
                                    @${tweet.user.screen_name}
                                </div>
                            </div>
                        </div>`
                            

                        if(tweet.extended_entities && tweet.extended_entities.media.length > 0){
                            twitterfacts += imagenew(tweet.extended_entities.media);
                            twitterfacts += videonew(tweet.extended_entities.media);
                        }

                        // <div class="tweets-images">
                        //     <div class="tweets-single-image">
                        //     </div>
                        // </div>


        twitterfacts += `      
                        <div class="tweet-text">
                            ${tweet.full_text}
                        </div>
                        <div class="tweet-date">
                            ${newdate1}
                        </div>
                    </div>
        `
    })
if(pagenext){
    document.querySelector('.tweets-all').insertAdjacentHTML('beforeend',twitterfacts);
}else{

document.querySelector('.tweets-all').innerHTML=twitterfacts;
}
}

//getTwData();

const imagenew = (mediaList) =>{
    let images_lists=`<div class="tweets-images">`;
    let imagethere= false;
    mediaList.map((media) => {
        if(media.type== "photo"){
            imagethere=true;
            images_lists +=`<div class="tweets-single-image" position="center" style="background-image: url(${media.media_url_https})"></div>`
        }
    });
    images_lists+=`</div>`
    return imagethere ? images_lists : '';
}

const videonew = (videoList) =>{
    let videos_lists=`<div class="tweets-videos">`;
    let videothere= false;
    videoList.map((media) => {
        if(media.type== "video"){
            videothere=true;
            const videoc=media.video_info.variants.find((variant)=>variant.content_type=='video/mp4');
            videos_lists +=`
            
            <video controls>
                <source src="${videoc.url}" type="video/mp4">
            </video>`
        } else if(media.type=="animated_gif"){
            const videoc=media.video_info.variants.find((variant)=>variant.content_type=='video/mp4');
            videothere=true;
            videos_lists +=` 
            <video loop autoplay>
                <source src="${media.video_info.variants[0].url}" type="video/mp4">
            </video>`
        }
    });
    videos_lists+=`</div>`
    return videothere ? videos_lists : '';
}

const trendnow = (value) => {
    const value_1=value.innerText;
    document.getElementById('search-input').value=value_1;
    getTwData();

}

page_next_data =(metadata) =>{
    if(metadata.next_results){
        page_next_url=`${URL}${metadata.next_results}`;
    }else{
        page_next_url=null;
    }

}

const on_new_page=() =>{
    if(page_next_url){
        getTwData(true)
    }
}

const page_2_visibility =(metadata) =>{
    if(metadata.next_results){
        document.getElementById('page-2-id').style.visibility="visible";
    }
    else{
        document.getElementById('page-2-id').style.visibility="hidden";

    }
}