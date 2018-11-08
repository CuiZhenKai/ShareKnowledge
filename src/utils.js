
//工具类文件
//专门用来放置各种工具

export function getRedirectPath(type,avatar){
    //根据用户的信息,用来返回跳转地址
    let url = (type.type==='genius')?'/genius':'/boss';
    
    //根据是否有头像来判断用户的信息是否完善了
    if(!avatar){
        //没有头像
        url+='info';
    }
    // console.log(url);
    //测试vscode与github联调
    return url;
}