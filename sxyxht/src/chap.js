function execute(url) {
    //https://m.sxyxht.com/dushu/12350_150_1.html
    var page = "0"
    var numPage = 0
    var newUrl = url.match(/(.+)(.html)/)


    var doc = Http.get(newUrl[1] + "_" + page + ".html").html()

    var text = ""
    var checkNext = doc.select(".content .content_btn")[1].select(".ptm-col-xs-3")[1].select("a").attr("href").split("_").length

    while(numPage==0||checkNext!=2){
        doc = Http.get(newUrl[1] + "_" + "1" + ".html").html()
        
        doc.select('p').remove()
        doc.select('script').remove()
        doc.select('ins').remove()
        
        text2 =doc.select("#BookText").html()

        if(text2.replace(/<![^>]+>/g,'')!=""){
            //Console.log(text2)
            text2 = text2.replace(/<br><br>/g,'NHTS')
            text2 = text2.replace(/<[^>]+>/g,'')
            text2 = text2.replace(/&nbsp;/g,'')
            text2 = text2.replace(/--&gt;&gt;/g,'')
            text2 = text2.replace(/NHTS/g,'<br>')
            text = text + text2
            page = (parseInt(page) + 1).toString()
            numPage +=1
            checkNext = doc.select(".content .content_btn")[1].select(".ptm-col-xs-3")[1].select("a").attr("href").split("_").length
            return Response.success(numPage==0||checkNext!=2)
            if(checkNext==2) break 
        }

    }
    return Response.success(text)
}