// rtd calculators
//PlatTerm.convert(ohm,value,a,b,c)

let defaultCoef = {
    a: +3.9083E-3,
    b: -5.7750E-7,
    c: -4.1830E-12
};

var PlatTerm = (function() {

     function prtResistance(value,Ro,a,b,c){
        var resistance = 'out of range';
        var range = false;

        if( (value >= -200) && (value <= 850) ) {
            if(value >= 0 ){
                resistance =  Ro * (( b * value + (a)) * value + 1);
            } else {
                resistance = Ro * ((((value - 100) * c * value + (b) ) * value + (a) ) * value + 1);
            }

            range = true;
        } //else { range = false; } ;

        //console.log( resistance, range );
        return {r:resistance,range: range} ;
    };

    return {
        // unit,value
        convert:function(unit,value,a,b,c){
            var result;
            var Ro = parseFloat(100,000);
            value = parseFloat(value);
            a = parseFloat(a);
            b = parseFloat(b),
            c = parseFloat(c);


            var rdata = prtResistance(value,Ro,a,b,c);
            var rng = rdata.range;
            var result = rdata.r;

            if (isNaN(value)) {
                throw new TypeError("Input is not a number");
            }

            if ( rng === false) {
                throw new TypeError("Out of range");
            }

            // unit toohm or totemp
            if( unit === 'totemp' ){
               return result;
            } else {
              
        result = (-Ro * a + Math.sqrt(Ro * Ro * + a * a - 4 * Ro * b * (Ro - value))) /(2 * Ro * b);
        return result;
                }
        }
    }
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = PlatTerm;
else
    window.PlatTerm = PlatTerm;
