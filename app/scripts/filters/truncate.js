/**
 * Truncate Filter
 * @Param text
 * @Param length, default is 10
 * @Param end, default is "..."
 * @return string
 */
angular.module('filters', []).
    /**
     * Usage
     *
     * var myText = "This is an example.";
     *
     * {{myText|Truncate}}
     * {{myText|Truncate:5}}
     * {{myText|Truncate:25:" ->"}}
     * Output
     * "This is..."
     * "Th..."
     * "This is an e ->"
     *
     */

    filter('truncate', function () {
        return function (text, length, end) {
            if (isNaN(length))
                length = 10;

            if (end === undefined)
                end = "...";

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }

        };
    }).

    filter('newlines', function(){
        return function(text){
            if (text){
                return text.replace(/\n/g, '<br/>');      
            }
            return '';    
        }
    });

