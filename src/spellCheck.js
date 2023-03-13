const spell = require('spell-checker-js');
const cheerio = require('cheerio');
const fs = require('fs')


module.exports =(on)=>{
    on('task', {
	    checkspell(value) {  
             let filename = value.reportName.replaceAll(/\s/g,'_').trim()
            if(filename == ""){
                filename = 'Result'
            }
             if (!fs.existsSync('cypress/spell-check')) {
                fs.mkdirSync('cypress/spell-check')
                }
             
                const $ = cheerio.load(value.data)
                spell.load('en')
                //Putting  all Html Tags in Array   
                const Tags = ["tr","h1","h3","h4","h5","ul","li"]


                for (var iter = 0; iter < Tags.length; iter++) {
                    var Tag = Tags[iter]
                    $(Tag).each((_, e) => {
                        let txt = $(e).text()

                        if (txt == "") { }
                        else {
                            const check = spell.check(txt)
                            if (check.length != 0) {
                                for (var k = 0; k < check.length; k++) {

                                    if (hasNumbers(check[k]) == false && isValid(check[k])) {
                                        try{
                                        fs.appendFileSync('cypress/spell-check/'+ filename, check[k] + "\n")
                                        }
                                        catch(err){
                                            console.error(err)
                                        }
                                    }
                                }

                            }

                        }

                    })
                }
            function message(filename)
            {
                if(fs.existsSync('cypress/spell-check/'+filename)){
                    return 'Spell check complete check result : cypress/spell-check/' + filename + '.txt'
                }
                else
                {
                    return  'Spell check complete with no issues'
                }
            }
            function hasNumbers(t) {
                var regex = /\d/g;
                return regex.test(t);
            }
            function isValid(str){
                return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
               }
            return  {
                
                message :   message(filename)
            }
        }
    })
}