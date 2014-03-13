"use strict";
//alert("beginning of equation editor api");
//Modernizr.svg = false;

var getInternetExplorerVersion = function()
{
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appName == 'Netscape')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

var IEVersion = getInternetExplorerVersion();
jQuery.fn.insertAt = function(index, element) {
    var lastIndex = this.children().size();
    if (index < 0) {
        index = Math.max(0, lastIndex + 1 + index);
    }
    this.append(element);
    if (index < lastIndex) {
        this.children().eq(index).before(this.children().last());
    }
    return this;
};

Array.prototype.max = function() {
    return Math.max.apply( Math, this );
};

Array.prototype.getMaxIndex = function() {
    var maxIndex = 0;
    for (var i = 1; i < this.length; i++) {
        if (this[i] > this[maxIndex]) {
            maxIndex = i;
        }
    }
    return maxIndex;
}

Array.prototype.getMinIndex = function() {
    var minIndex = 0;
    for (var i = 1; i < this.length; i++) {
        if (this[i] < this[minIndex]) {
            minIndex = i;
        }
    }
    return minIndex;
}

var eqEd = eqEd || {};

eqEd.NoConstructorCall = function() {};
eqEd.noConstructorCall = new eqEd.NoConstructorCall();

/////// Begin SymbolSizeConfiguration Object ///////

eqEd.SymbolSizeConfiguration = function() {
    this.fontSizes = ["fontSizeSmallest", "fontSizeSmaller", "fontSizeNormal"];
    this.fontStyles = ["fontNormal", "fontItalic"];
    // Lists all characters which need to be rendered in a normal font.
    this.fontNormal = ['0', '1', '2', '3', '4', '5', '6', '7', '8', 
                 '9', '+', '&#x2212;', '&#x00f7;', '&#x22c5;', '&#x2248;', 
                 '=', '&#60;', '&#62;', '&#x2264;', '&#x2265;', '&#x221e;', 
                 '%', '!', '.'];
    // Lists all characters which need to be rendered in an italic font. 
    this.fontItalic = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
                 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
                 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A',
                 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
                 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '&Alpha;', 
                 '&Beta;', '&Gamma;', '&Delta;', '&Epsilon;', 
                 '&Zeta;', '&Eta;', '&Theta;', '&Iota;', '&Kappa;', 
                 '&Lambda;', '&Mu;', '&Nu;', '&Xi;', '&Omicron;', 
                 '&Pi;', '&Rho;','&Sigma;', '&Tau;', '&Upsilon;', 
                 '&Phi;', '&Chi;', '&Psi;', '&Omega;', '&alpha;', 
                 '&beta;', '&gamma;', '&delta;', '&epsilon;', '&zeta;', 
                 '&eta;', '&theta;', '&iota;', '&kappa;', '&lambda;', 
                 '&mu;', '&nu;', '&xi;', '&omicron;', '&pi;', '&rho;', 
                 '&sigma;', '&tau;', '&upsilon;', '&phi;', '&chi;', 
                 '&psi;', '&omega;', '&#x03C2;', '&#x2202;'];
    /*  Each the height object will contain the keys contained in
    **  the array eqEd.SymbolSizeConfiguration.fontSizes
    */
    this.height = {};
    /*  Each object within the width object will contain the keys contained in
    **  the array eqEd.SymbolSizeConfiguration.fontSizes
    */
    this.width = {
        'a': {},
        'b': {},
        'c': {},
        'd': {},
        'e': {},
        'f': {},
        'g': {},
        'h': {},
        'i': {},
        'j': {},
        'k': {},
        'l': {},
        'm': {},
        'n': {},
        'o': {},
        'p': {},
        'q': {},
        'r': {},
        's': {},
        't': {},
        'u': {},
        'v': {},
        'w': {},
        'x': {},
        'y': {},
        'z': {},
        'A': {},
        'B': {},
        'C': {},
        'D': {},
        'E': {},
        'F': {},
        'G': {},
        'H': {},
        'I': {},
        'J': {},
        'K': {},
        'L': {},
        'M': {},
        'N': {},
        'O': {},
        'P': {},
        'Q': {},
        'R': {},
        'S': {},
        'T': {},
        'U': {},
        'V': {},
        'W': {},
        'X': {},
        'Y': {},
        'Z': {},
        '&Alpha;': {},
        '&Beta;': {},
        '&Gamma;': {},
        '&Delta;': {},
        '&Epsilon;': {},
        '&Zeta;': {},
        '&Eta;': {},
        '&Theta;': {},
        '&Iota;': {},
        '&Kappa;': {},
        '&Lambda;': {},
        '&Mu;': {},
        '&Nu;': {},
        '&Xi;': {},
        '&Omicron;': {},
        '&Pi;': {},
        '&Rho;': {},
        '&Sigma;': {},
        '&Tau;': {},
        '&Upsilon;': {},
        '&Phi;': {},
        '&Chi;': {},
        '&Psi;': {},
        '&Omega;': {},
        '&alpha;': {},
        '&beta;': {},
        '&gamma;': {},
        '&delta;': {},
        '&epsilon;': {},
        '&zeta;': {},
        '&eta;': {},
        '&theta;': {},
        '&iota;': {},
        '&kappa;': {},
        '&lambda;': {},
        '&mu;': {},
        '&nu;': {},
        '&xi;': {},
        '&omicron;': {},
        '&pi;': {},
        '&rho;': {},
        '&sigma;': {},
        '&tau;': {},
        '&upsilon;': {},
        '&phi;': {},
        '&chi;': {},
        '&psi;': {},
        '&omega;': {},
        // final sigma
        '&#x03C2;': {},
        // partial derivative
        '&#x2202;': {},
        '0': {},
        '1': {},
        '2': {},
        '3': {},
        '4': {},
        '5': {},
        '6': {},
        '7': {},
        '8': {},
        '9': {},
        '+': {},
        // minus
        '&#x2212;': {},
        // division operator(obelus)
        '&#x00f7;': {},
        // dot operator
        '&#x22c5;': {},
        // approx. equal to
        '&#x2248;': {},
        '=': {},
        // less than
        '&#60;': {},
        // greater than
        '&#62;': {},
        // less than or equal to
        '&#x2264;': {},
        // greater than or equal to
        '&#x2265;': {},
        // infinity
        '&#x221e;': {},
        '%': {},
        '!': {},
        '.': {}
    };
    /*
    // Exeeding width expressed as a proportion of calculated character width
    this.charWidthExceedsBoundingBox = {
        'a': 0.05,
        'b': 0,
        'c': 0,
        'd': 0.125,
        'e': 0,
        'f': 0.5,
        'g': 0.1,
        'h': 0.1,
        'i': 0.075,
        'j': 0.2,
        'k': 0.15,
        'l': 0.25,
        'm': 0.05,
        'n': 0.075,
        'o': 0,
        'p': 0,
        'q': 0.125,
        'r': 0.2,
        's': 0.1,
        't': 0.2,
        'u': 0.1,
        'v': 0.15,
        'w': 0.075,
        'x': 0.2,
        'y': 0.1,
        'z': 0.2,
        'A': 0,
        'B': 0.075,
        'C': 0.175,
        'D': 0.05,
        'E': 0.125,
        'F': 0.15,
        'G': 0.075,
        'H': 0.15,
        'I': 0.35,
        'J': 0.225,
        'K': 0.15,
        'L': 0.05,
        'M': 0.15,
        'N': 0.15,
        'O': 0.075,
        'P': 0.125,
        'Q': 0.05,
        'R': 0,
        'S': 0.15,
        'T': 0.175,
        'U': 0.15,
        'V': 0.175,
        'W': 0.15,
        'X': 0.125,
        'Y': 0.2,
        'Z': 0.15,
        '&Alpha;': 0,
        '&Beta;': 0,
        '&Gamma;': 0,
        '&Delta;': 0,
        '&Epsilon;': 0,
        '&Zeta;': 0,
        '&Eta;': 0,
        '&Theta;': 0,
        '&Iota;': 0,
        '&Kappa;': 0,
        '&Lambda;': 0,
        '&Mu;': 0,
        '&Nu;': 0,
        '&Xi;': 0,
        '&Omicron;': 0,
        '&Pi;': 0,
        '&Rho;': 0,
        '&Sigma;': 0,
        '&Tau;': 0,
        '&Upsilon;': 0,
        '&Phi;': 0,
        '&Chi;': 0,
        '&Psi;': 0,
        '&Omega;': 0,
        '&alpha;': 0,
        '&beta;': 0,
        '&gamma;': 0,
        '&delta;': 0,
        '&epsilon;': 0,
        '&zeta;': 0,
        '&eta;': 0,
        '&theta;': 0,
        '&iota;': 0,
        '&kappa;': 0,
        '&lambda;': 0,
        '&mu;': 0,
        '&nu;': 0,
        '&xi;': 0,
        '&omicron;': 0,
        '&pi;': 0,
        '&rho;': 0,
        '&sigma;': 0,
        '&tau;': 0,
        '&upsilon;': 0,
        '&phi;': 0,
        '&chi;': 0,
        '&psi;': 0,
        '&omega;': 0,
        // final sigma
        '&#x03C2;': 0,
        // partial derivative
        '&#x2202;': 0,
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '+': 0,
        // minus
        '&#x2212;': 0,
        // division operator(obelus)
        '&#x00f7;': 0,
        // dot operator
        '&#x22c5;': 0,
        // approx. equal to
        '&#x2248;': 0,
        '=': 0,
        // less than
        '&#60;': 0,
        // greater than
        '&#62;': 0,
        // less than or equal to
        '&#x2264;': 0,
        // greater than or equal to
        '&#x2265;': 0,
        // infinity
        '&#x221e;': 0,
        '%': 0,
        '!': 0,
        '.': 0
    }
    */
    this.charWidthExceedsBoundingBox = {
        'a': 0,
        'b': 0,
        'c': 0,
        'd': 0,
        'e': 0,
        'f': 0,
        'g': 0,
        'h': 0,
        'i': 0,
        'j': 0,
        'k': 0,
        'l': 0,
        'm': 0,
        'n': 0,
        'o': 0,
        'p': 0,
        'q': 0,
        'r': 0,
        's': 0,
        't': 0,
        'u': 0,
        'v': 0,
        'w': 0,
        'x': 0,
        'y': 0,
        'z': 0,
        'A': 0,
        'B': 0,
        'C': 0,
        'D': 0,
        'E': 0,
        'F': 0,
        'G': 0,
        'H': 0,
        'I': 0,
        'J': 0,
        'K': 0,
        'L': 0,
        'M': 0,
        'N': 0,
        'O': 0,
        'P': 0,
        'Q': 0,
        'R': 0,
        'S': 0,
        'T': 0,
        'U': 0,
        'V': 0,
        'W': 0,
        'X': 0,
        'Y': 0,
        'Z': 0,
        '&Alpha;': 0,
        '&Beta;': 0,
        '&Gamma;': 0,
        '&Delta;': 0,
        '&Epsilon;': 0,
        '&Zeta;': 0,
        '&Eta;': 0,
        '&Theta;': 0,
        '&Iota;': 0,
        '&Kappa;': 0,
        '&Lambda;': 0,
        '&Mu;': 0,
        '&Nu;': 0,
        '&Xi;': 0,
        '&Omicron;': 0,
        '&Pi;': 0,
        '&Rho;': 0,
        '&Sigma;': 0,
        '&Tau;': 0,
        '&Upsilon;': 0,
        '&Phi;': 0,
        '&Chi;': 0,
        '&Psi;': 0,
        '&Omega;': 0,
        '&alpha;': 0,
        '&beta;': 0,
        '&gamma;': 0,
        '&delta;': 0,
        '&epsilon;': 0,
        '&zeta;': 0,
        '&eta;': 0,
        '&theta;': 0,
        '&iota;': 0,
        '&kappa;': 0,
        '&lambda;': 0,
        '&mu;': 0,
        '&nu;': 0,
        '&xi;': 0,
        '&omicron;': 0,
        '&pi;': 0,
        '&rho;': 0,
        '&sigma;': 0,
        '&tau;': 0,
        '&upsilon;': 0,
        '&phi;': 0,
        '&chi;': 0,
        '&psi;': 0,
        '&omega;': 0,
        // final sigma
        '&#x03C2;': 0,
        // partial derivative
        '&#x2202;': 0,
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '+': 0,
        // minus
        '&#x2212;': 0,
        // division operator(obelus)
        '&#x00f7;': 0,
        // dot operator
        '&#x22c5;': 0,
        // approx. equal to
        '&#x2248;': 0,
        '=': 0,
        // less than
        '&#60;': 0,
        // greater than
        '&#62;': 0,
        // less than or equal to
        '&#x2264;': 0,
        // greater than or equal to
        '&#x2265;': 0,
        // infinity
        '&#x221e;': 0,
        '%': 0,
        '!': 0,
        '.': 0
    };

    //Initialize the object.
    this.computeSymbolSizes();
};

(function() {
    eqEd.SymbolSizeConfiguration.prototype.getFontStyleForCharacter = function(character) {
        var fontStyle = "";
        if (_.indexOf(this.fontNormal, character) != -1) {
            fontStyle = "fontNormal";
        } else if (_.indexOf(this.fontItalic, character) != -1) {
            fontStyle = "fontItalic";
        } else {
            throw "Error: Character '" + character + "' is missing a fontStyle definition. Add this character to a fontStyle array.";
        }
        return fontStyle;
    };
    eqEd.SymbolSizeConfiguration.prototype.computeSymbolSizes = function() {
        /*  This method will compute the heights and widths for each available character
        **  at each available font size and store them in the eqEd.SymbolSizeConfiguration
        **  object.  This method should get called on the initialization of the editor. The
        **  purpose of this, is to allow all formatting calculation to be done in pure javascript
        **  after initialization is complete. This saves constantly dipping into the dom to
        **  check the heights widths of characters/containers/wrappers etc. Makes the code
        **  cleaner, and should give a performance boost.
        */
        var characters = _.keys(this.width);
        for (var i = 0; i < characters.length; i++) {
            var character = characters[i];
            for (var j = 0; j < this.fontSizes.length; j++) {
                var fontSize = this.fontSizes[j];
                var fontStyle = this.getFontStyleForCharacter(character);
                $('.testContainer').append('<div class="' + fontSize + ' ' + fontStyle + ' fontTest" id="fontTest">' + character + '</div>');
                var fontTest = $('#fontTest');
                if (i == 0) {
                    this.height[fontSize] = fontTest.outerHeight();
                }
                this.width[character][fontSize] = fontTest.outerWidth() + fontTest.outerWidth()*this.charWidthExceedsBoundingBox[character];
                fontTest.remove();
            }
        }
    }
})();

/////// End SymbolSizeConfiguration Object ///////

/////// Begin Cursor Class ///////

eqEd.Cursor = function() {
    this.parent = null;
    // index is the position of the cursor within the container.
    // Zero is the position before the first wrapper.
    this.index = null;
    this.parentToggleLines = [];
    this.jQueryObject = $(this.buildHtmlRepresentation());
};

(function() {

    eqEd.Cursor.prototype.moveLeft = function() {
        if (this.index !== 0) {
            this.index = this.index - 1;
            this.updateFormatting();
        }
    }
    eqEd.Cursor.prototype.moveRight = function() {
        if (this.index < this.parent.wrappers.length) {
            this.index = this.index + 1;
            this.updateFormatting();
        }
    }
    eqEd.Cursor.prototype.buildHtmlRepresentation = function() {
        return '<div id="cursor"></div>';
    }
    eqEd.Cursor.prototype.updateFormatting = function() {
        if (this.parent !== null) {
            if (this.parent.jQueryObject.hasClass("squareEmptyContainer")) {
                this.index = 0;
                this.top = (this.parent.height - 0.5 * this.parent.borderWidth) * 0.1;
                this.left = (this.parent.height - 0.5 * this.parent.borderWidth) * 0.1;
                this.width = (this.parent.height - 0.5 * this.parent.borderWidth) * 0.8;
                this.height = (this.parent.height - 0.5 * this.parent.borderWidth) * 0.8;
            } else {
                var widthSum = 0;

                for (var i = 0; i < this.index; i++) {
                    widthSum += this.parent.wrappers[i].width;
                }
                this.top = this.parent.height * 0.05;
                this.width = 2;
                this.left = widthSum - 0.5 * this.width;
                this.height = this.parent.height * 0.9;
            }
            this.jQueryObject.css({
                left: Math.ceil(this.left),
                top: Math.ceil(this.top),
                height: Math.ceil(this.height),
                width: Math.ceil(this.width)
            });
        }
    }

    eqEd.Cursor.prototype.removeCursor = function() {
        $('#cursor').remove();
        this.parent = null;
        this.index = null;
        this.updateFormatting();
    }
    eqEd.Cursor.prototype.addCursor = function(container) {
        this.parent = container;
        this.parent.jQueryObject.append(this.jQueryObject);
        this.updateFormatting();
    }
    eqEd.Cursor.prototype.calculateIndex = function(offsetLeft) {
        var index;
        for (var i = 0; i < this.toggleLines.length; i++) {
            if (offsetLeft < this.toggleLines[i]) {
                index = i;
                break;
            } else {
                index = this.toggleLines.length;
            }
        }
        return index;
    }
})();

/////// End Cursor Class ///////

/////// Begin Highlight Class ///////

eqEd.Highlight = function() {
    this.parent = null;
    this.startIndex = null;
    this.endIndex = null;
    this.jQueryObject = $(this.buildHtmlRepresentation());
};

(function() {
    eqEd.Highlight.prototype.buildHtmlRepresentation = function() {
        return '<div id="highlight"></div>';
    }
    eqEd.Highlight.prototype.updateFormatting = function() {
        if (this.startIndex < this.endIndex) {
            this.left = this.parent.wrappers[this.startIndex].left;
            this.top = 0;
            this.height = this.parent.height;

            this.parent.jQueryObject.children().removeClass('highlighted');
            var widthSum = 0;
            for (var i = this.startIndex; i < this.endIndex; i++) {
                if (this.startIndex !== this.endIndex) {
                    var wrapper = this.parent.wrappers[i];
                    wrapper.jQueryObject.addClass('highlighted');
                    widthSum += wrapper.width;
                }
            }
            this.width = widthSum;
        } else if (this.startIndex > this.endIndex) {
            this.left = this.parent.wrappers[this.endIndex].left;
            this.top = 0;
            this.height = this.parent.height;

            this.parent.jQueryObject.children().removeClass('highlighted');
            var widthSum = 0;
            for (var i = this.endIndex; i < this.startIndex; i++) {
                if (this.startIndex !== this.endIndex) {
                    var wrapper = this.parent.wrappers[i];
                    wrapper.jQueryObject.addClass('highlighted');
                    widthSum += wrapper.width;
                }
            }
            this.width = widthSum;
        } else if (this.startIndex === this.endIndex) {
            this.left = 0;
            this.top = 0;
            this.height = 0;
            this.width = 0;
            this.parent.jQueryObject.children().removeClass('highlighted');
        }
        $('.stackedFractionHorizontalBar').css('background', '#000000');
        $('.highlighted').find('.stackedFractionHorizontalBar').css('background', '#FFFFFF'); 
        $('.squareEmptyContainer').css('border-color', '#000000');
        $('.highlighted').find('.squareEmptyContainer').css('border-color', '#FFFFFF');
        $('.squareRootOverBar').css('background', '#000000');
        $('.highlighted').find('.squareRootOverBar').css('background', '#FFFFFF');
        $('.nthRootOverBar').css('background', '#000000');
        $('.highlighted').find('.nthRootOverBar').css('background', '#FFFFFF');
        if(Modernizr.svg) {
            $('.squareRootRadical').find('path').css({'fill': '#000000'});
            $('.squareRootDiagonal').find('path').css({'fill': '#000000'});
            $('.nthRootRadical').find('path').css({'fill': '#000000'});
            $('.nthRootDiagonal').find('path').css({'fill': '#000000'});
            $('.additionOperator').find('path').css({'fill': '#000000'});
            $('.subtractionOperator').find('path').css({'fill': '#000000'});
            $('.equalOperator').find('path').css({'fill': '#000000'});
            $('.lessThanOrEqualToOperator').find('path').css({'fill': '#000000'});
            $('.lessThanOperator').find('path').css({'fill': '#000000'});
            $('.greaterThanOperator').find('path').css({'fill': '#000000'});
            $('.greaterThanOrEqualToOperator').find('path').css({'fill': '#000000'});
            $('.dotProductOperator').find('path').css({'fill': '#000000'});
            $('.parenthesesLeftBracket').find('path').css({'fill': '#000000', 'stroke': '#000000'});
            $('.parenthesesRightBracket').find('path').css({'fill': '#000000', 'stroke': '#000000'});
            $('.curlyLeftBracket').find('path').css({'fill': '#000000'});
            $('.curlyRightBracket').find('path').css({'fill': '#000000'});
            $('.squareLeftBracket').find('path').css({'fill': '#000000'});
            $('.squareRightBracket').find('path').css({'fill': '#000000'});
            $('.sumBigOperatorSymbol').find('path').css({'fill': '#000000'});
            $('.highlighted').find('path').css({'fill': '#FFFFFF'});
            $('.highlighted').find('.parenthesesLeftBracket').find('path').css({'stroke': '#FFFFFF'});
            $('.highlighted').find('.parenthesesRightBracket').find('path').css({'stroke': '#FFFFFF'});

        } else {
            $('.squareRootRadical').find('.highlightVersion').css('visibility', 'hidden');
            $('.squareRootRadical').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.squareRootDiagonal').find('.highlightVersion').css('visibility', 'hidden');
            $('.squareRootDiagonal').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.nthRootRadical').find('.highlightVersion').css('visibility', 'hidden');
            $('.nthRootRadical').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.nthRootDiagonal').find('.highlightVersion').css('visibility', 'hidden');
            $('.nthRootDiagonal').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.additionOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.additionOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.subtractionOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.subtractionOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.equalOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.equalOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.lessThanOrEqualToOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.lessThanOrEqualToOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.lessThanOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.lessThanOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.greaterThanOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.greaterThanOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.greaterThanOrEqualToOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.greaterThanOrEqualToOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.dotProductOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.dotProductOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.parenthesesLeftBracket').find('.highlightVersion').css('visibility', 'hidden');
            $('.parenthesesLeftBracket').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.parenthesesRightBracket').find('.highlightVersion').css('visibility', 'hidden');
            $('.parenthesesRightBracket').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.curlyLeftBracket').find('.highlightVersion').css('visibility', 'hidden');
            $('.curlyLeftBracket').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.curlyRightBracket').find('.highlightVersion').css('visibility', 'hidden');
            $('.curlyRightBracket').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.squareLeftBracket').find('.highlightVersion').css('visibility', 'hidden');
            $('.squareLeftBracket').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.squareRightBracket').find('.highlightVersion').css('visibility', 'hidden');
            $('.squareRightBracket').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.sumBigOperatorSymbol').find('.highlightVersion').css('visibility', 'hidden');
            $('.sumBigOperatorSymbol').find('.nonHighlightVersion').css('visibility', 'visible');

            $('.highlighted').find('.nonHighlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.highlightVersion').css('visibility', 'visible');
        }
        this.jQueryObject.css({
            left: Math.ceil(this.left),
            top: Math.ceil(this.top),
            height: Math.ceil(this.height),
            width: Math.ceil(this.width)
        });
    }
    eqEd.Highlight.prototype.addHighlight = function(container) {
        this.parent = container;
        this.parent.jQueryObject.css('z-index', 4);
        this.jQueryObject.css('z-index', 5);
        this.parent.jQueryObject.children().css('z-index', 6);
        this.parent.jQueryObject.append(this.jQueryObject);
    }
    eqEd.Highlight.prototype.removeHighlight = function() {
        $('#highlight').remove();
        $('.highlighted').find('.stackedFractionHorizontalBar').css('background', '#000000');
        $('.highlighted').find('.squareEmptyContainer').css('border-color', '#000000');
        $('.highlighted').find('.squareRootOverBar').css('background', '#000000');
        $('.highlighted').find('.nthRootOverBar').css('background', '#000000');
        if(Modernizr.svg) {
            $('.highlighted').find('path').css({'fill': '#000000'});
            $('.highlighted').find('.parenthesesLeftBracket').find('path').css({'stroke': '#000000'});
            $('.highlighted').find('.parenthesesRightBracket').find('path').css({'stroke': '#000000'});
        } else {
            $('.highlighted').find('.squareRootRadical').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.squareRootRadical').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.squareRootDiagonal').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.squareRootDiagonal').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.additionOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.additionOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.subtractionOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.subtractionOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.equalOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.equalOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.lessThanOrEqualToOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.lessThanOrEqualToOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.lessThanOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.lessThanOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.greaterThanOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.greaterThanOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.greaterThanOrEqualToOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.greaterThanOrEqualToOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.dotProductOperator').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.dotProductOperator').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.parenthesesLeftBracket').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.parenthesesLeftBracket').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.parenthesesRightBracket').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.parenthesesRightBracket').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.curlyLeftBracket').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.curlyLeftBracket').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.curlyRightBracket').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.curlyRightBracket').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.squareLeftBracket').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.squareLeftBracket').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.squareRightBracket').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.squareRightBracket').find('.nonHighlightVersion').css('visibility', 'visible');
            $('.highlighted').find('.sumBigOperatorSymbol').find('.highlightVersion').css('visibility', 'hidden');
            $('.highlighted').find('.sumBigOperatorSymbol').find('.nonHighlightVersion').css('visibility', 'visible');
        }
        if (this.parent !== null) {
            this.parent.jQueryObject.children().removeClass('highlighted');
        }
        $('.container').css('z-index', 3);
        $('.wrapper').css('z-index', 3);
        this.parent = null;
        this.startIndex = null;
        this.endIndex = null;
        this.left = 0;
        this.top = 0;
        this.height = 0;
        this.width = 0;
        this.jQueryObject.css({
            left: Math.ceil(this.left),
            top: Math.ceil(this.top),
            height: Math.ceil(this.height),
            width: Math.ceil(this.width)
        });
    }
})();

/////// End Highlight Class ///////

/////// Begin EquationObject Class ///////

eqEd.EquationObject = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }

    this.jQueryObject = $(this.buildHtmlRepresentation());
    this.jQueryObject.data("eqObject", this);
    this.symbolSizeConfig = symbolSizeConfig;
    this.left = 0;
    this.top = 0;
    this.width = 0;
    this.height = 0;
};

(function() {
    
    eqEd.EquationObject.prototype.updateTop = function() {
        this.top = 0;
    }
    eqEd.EquationObject.prototype.updateLeft = function() {
        this.left = 0;
    }
    eqEd.EquationObject.prototype.updateWidth = function() {
        this.width = 0;
    }
    eqEd.EquationObject.prototype.updateHeight = function() {
        this.height = 0;
    }
    eqEd.EquationObject.prototype.updateFormatting = function() { }
    eqEd.EquationObject.prototype.buildHtmlRepresentation = function() {
        return '';
    };
})();

/////// End EquationObject Class ///////

/////// Begin Container Class ///////

eqEd.Container = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.EquationObject.call(this, symbolSizeConfig);

    this.wrappers = [];
    this.topAlign = 0;
    this.bottomAlign = 0;
    this.padLeft = 0;
    this.padRight = 0;
    this.padTop = 0;
    this.padBottom = 0;
    this.fontSize = "";
    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
    this.maxTopAlignIndex = null;
    this.maxBottomAlignIndex = null;
}

eqEd.Container.prototype = new eqEd.EquationObject(eqEd.noConstructorCall);

(function() {
    eqEd.Container.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.fontSize];
        this.top = this.adjustTop * fontHeight;
    }
    eqEd.Container.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.fontSize];
        this.left = this.adjustLeft * fontHeight;
    }
    eqEd.Container.prototype.updateWidth =function() { }
    eqEd.Container.prototype.updateHeight = function() { }
    eqEd.Container.prototype.updateWrapperPropertiesAddWrappers = function(insertedWrapperIndices) {
        // Update the index
        for (var i = 0; i < this.wrappers.length; i++) {
            this.wrappers[i].index = i;
        }
        for(var i = 0; i < insertedWrapperIndices.length; i++) {
            var index = insertedWrapperIndices[i];
            // Update the parent
            this.wrappers[index].parent = this;
        }
    }

    eqEd.Container.prototype.updateWrapperPropertiesDeletedWrappers = function(deletedWrapperIndices) {
        // Update the index
        for (var i = 0; i < this.wrappers.length; i++) {
            this.wrappers[i].index = i;
        }
    }

    eqEd.Container.prototype.addWrappers = function(indexAndWrapperList) {
        /*  This method takes a list of indices, and wrapper objects, and adds them
        **  to the container object's list of wrappers.
        **  The indices should specify what the final desired index of the wrapper
        **  object should be. Wrappers already in the list (at indices greater than 
        **  the inserted wrappers index) will be pushed to the right one entry for 
        **  each wrapper inserted. Order of the index/wrapper pairs as arguments 
        **  shouldn't matter.
        **  e.g. container.addWrappers([1, wrapper1], [4, wrapper3], [2, wrapper2]);
        **  If the original list was [w0, w1, w2, w3, w4, w5, w6],
        **  it would now be [w0, wrapper1, wrapper2, w1, wrapper3, w2, w3, w4, w5, w6]
        */
        indexAndWrapperList = Array.prototype.slice.call(arguments);

        indexAndWrapperList = _.sortBy(indexAndWrapperList, function(innerArr) {
            return innerArr[0];
        });
        // Insert the wrapper objects into this container's wrapper array, and add
        // them to the DOM.
        for (var i = 0; i < indexAndWrapperList.length; i++) {
            var index = indexAndWrapperList[i][0];
            var wrapper = indexAndWrapperList[i][1];
            this.wrappers.splice(index, 0, wrapper);
            this.jQueryObject.insertAt(index, wrapper.jQueryObject);
        }

        // Update properties that belong to this container's wrapper objects.
        var insertedWrapperIndices = _.map(indexAndWrapperList, function(x) {
            return x[0];
        });
        this.updateWrapperPropertiesAddWrappers(insertedWrapperIndices);

        for (var i = 0; i < insertedWrapperIndices.length; i++) {
            this.wrappers[insertedWrapperIndices[i]].updateFormattingDeep();
            var j = 1;
            while (j > 0) {
                if (this.wrappers[insertedWrapperIndices[i] + j] instanceof eqEd.SuperscriptWrapper
                    || this.wrappers[insertedWrapperIndices[i] + j] instanceof eqEd.SubscriptWrapper
                    || this.wrappers[insertedWrapperIndices[i] + j] instanceof eqEd.SuperscriptAndSubscriptWrapper) {
                    this.wrappers[insertedWrapperIndices[i] + j].updateFormattingDeep();
                    j += 1;
                } else {
                    j = 0;
                }
            }
        }

        // Now that the inserted wrappers have been formatted, the formatting for superscripts/subscripts,
        // parentheses and operators (unary vs binary padding)
        for (var i = 0; i < this.wrappers.length; i++) {
            
            // Change padding on unary/binary operators
            if (this.wrappers[i] instanceof eqEd.OperatorWrapper) {
                if (this.wrappers[i-1] instanceof eqEd.OperatorWrapper
                    || this.wrappers[i-1] instanceof eqEd.LeftBracketWrapper
                    || i == 0) {
                    this.wrappers[i].padRight = 0.0;
                    this.wrappers[i].updateFormattingDeep();
                } else {
                    this.wrappers[i].padRight = 0.075;
                    this.wrappers[i].updateFormattingDeep();
                }
            }
            
        }

        // Update properties that belong to this container object.
        this.updateFormatting();

        // Ascend through anscestor wrappers/containers to update their formatting
        var currentElement = this;
        while (currentElement.parent !== null) {
            currentElement = currentElement.parent;
            currentElement.updateFormatting();
        }

    }

    eqEd.Container.prototype.removeWrappers = function(indexList) {
        // Assume that wrappers removed are a consecutive list.
        indexList = Array.prototype.slice.call(arguments);

        var maxIndex = indexList[indexList.getMaxIndex()];
        var minIndex = indexList[indexList.getMinIndex()];
        //alert(indexList)
        //alert(indexList[maxIndex])
        var nextWrapper = null;
        if (maxIndex !== this.wrappers.length - 1) {
            nextWrapper = this.wrappers[maxIndex + 1];
        }
        var prevWrapper = null;
        if (minIndex !== 0) {
            prevWrapper = this.wrappers[minIndex - 1];
        }

        var correction = 0;
        for (var i = 0; i < indexList.length; i++) {
            this.wrappers.splice(indexList[i] - correction, 1);
            this.jQueryObject.children().eq(indexList[i] - correction).remove();
            correction += 1;
        }
        this.updateWrapperPropertiesDeletedWrappers(indexList);
        
        if (nextWrapper !== null) {
            var i = nextWrapper.index - 1;
            var j = 1;
            while (j > 0) {
                if (this.wrappers[i + j] instanceof eqEd.SuperscriptWrapper
                    || this.wrappers[i + j] instanceof eqEd.SubscriptWrapper
                    || this.wrappers[i + j] instanceof eqEd.SuperscriptAndSubscriptWrapper) {
                    this.wrappers[i + j].updateFormattingDeep();
                    j += 1;
                } else {
                    j = 0;
                }
            }
        }
        // Change padding on unary/binary operators
        if (nextWrapper instanceof eqEd.OperatorWrapper) {
            if (prevWrapper instanceof eqEd.OperatorWrapper
                || this.wrappers[i-1] instanceof eqEd.LeftBracketWrapper
                || minIndex === 0) {
                nextWrapper.padRight = 0;
                nextWrapper.updateFormattingDeep();
            } else {
                nextWrapper.padRight = 0.075;
                nextWrapper.updateFormattingDeep();
            }
        }

        if (this.wrappers.length > 0) {
            this.updateFormatting();
            // Ascend through anscestor wrappers/containers to update their formatting
            var currentElement = this;
            while (currentElement.parent !== null) {
                currentElement = currentElement.parent;
                currentElement.updateFormatting();
            }
        }
    }
    eqEd.Container.prototype.updateFontSize = function() { }
    eqEd.Container.prototype.updateFormatting = function() {
        // It is assumed that each child wrapper already has it's height,
        // topAlign, bottomAlign, and width calculated/applied.

        // This method places the wrappers within the container,
        // and calculates the container's height, topAlign,
        // bottomAlign, and width. It also updates the jQuery
        // object.

        var fontHeight = this.symbolSizeConfig.height[this.fontSize];
        // Update the brackets, so that they are matched up.
        var pairIndices = [];
        var bracketStack = [];
        for (var i = 0; i < this.wrappers.length; i++) {
            if (this.wrappers[i] instanceof eqEd.LeftBracketWrapper) {
                bracketStack.push(this.wrappers[i]);
            } else if (this.wrappers[i] instanceof eqEd.RightBracketWrapper) {
                if (bracketStack.length > 0) {
                    if ((bracketStack[bracketStack.length - 1].bracket instanceof eqEd.ParenthesesLeftBracket
                        && this.wrappers[i].bracket instanceof eqEd.ParenthesesRightBracket) || 
                        (bracketStack[bracketStack.length - 1].bracket instanceof eqEd.CurlyLeftBracket
                        && this.wrappers[i].bracket instanceof eqEd.CurlyRightBracket) || 
                        (bracketStack[bracketStack.length - 1].bracket instanceof eqEd.SquareLeftBracket
                        && this.wrappers[i].bracket instanceof eqEd.SquareRightBracket)) {
                        pairIndices.push([bracketStack.pop(), this.wrappers[i]]);
                    }
                } else {
                    // Setting height to 0 resets the bracket formatting.
                    this.wrappers[i].bracket.height = 0;
                    this.wrappers[i].updateFormattingDeep();

                    var j = 1;
                    while (j > 0) {
                        if (this.wrappers[i + j] instanceof eqEd.SuperscriptWrapper
                            || this.wrappers[i + j] instanceof eqEd.SubscriptWrapper
                            || this.wrappers[i + j] instanceof eqEd.SuperscriptAndSubscriptWrapper) {
                            this.wrappers[i + j].updateFormattingDeep();
                            j += 1;
                        } else {
                            j = 0;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < bracketStack.length; i++) {
            // Setting height to 0 resets the bracket formatting.
            this.wrappers[bracketStack[i].index].bracket.height = 0;
            this.wrappers[bracketStack[i].index].updateFormattingDeep();
            var j = 1;
            while (j > 0) {
                if (this.wrappers[bracketStack[i].index + j] instanceof eqEd.SuperscriptWrapper
                    || this.wrappers[bracketStack[i].index + j] instanceof eqEd.SubscriptWrapper
                    || this.wrappers[bracketStack[i].index + j] instanceof eqEd.SuperscriptAndSubscriptWrapper) {
                    this.wrappers[bracketStack[i].index + j].updateFormattingDeep();
                    j += 1;
                } else {
                    j = 0;
                }
            }
        }
        for (var i = 0; i < pairIndices.length; i++) {
            var maxTopAlign = 0;
            var maxBottomAlign = 0;
            for (var j = pairIndices[i][0].index + 1; j < pairIndices[i][1].index; j++) {
                if (this.wrappers[j].topAlign > maxTopAlign) {
                    maxTopAlign = this.wrappers[j].topAlign;
                }
                if (this.wrappers[j].bottomAlign > maxBottomAlign) {
                    maxBottomAlign = this.wrappers[j].bottomAlign;
                }
            }
            var maxHeight = maxTopAlign + maxBottomAlign;
            pairIndices[i][0].topAlign = maxTopAlign;
            pairIndices[i][0].bottomAlign = maxBottomAlign;
            pairIndices[i][1].topAlign = maxTopAlign;
            pairIndices[i][1].bottomAlign = maxBottomAlign;
            pairIndices[i][0].bracket.height = maxHeight;
            pairIndices[i][1].bracket.height = maxHeight;
            pairIndices[i][0].updateFormattingDeep();
            var index = pairIndices[i][0].index;
            var j = 1;
            while (j > 0) {
                if (this.wrappers[index + j] instanceof eqEd.SuperscriptWrapper
                    || this.wrappers[index + j] instanceof eqEd.SubscriptWrapper
                    || this.wrappers[index + j] instanceof eqEd.SuperscriptAndSubscriptWrapper) {
                    this.wrappers[index + j].updateFormattingDeep();
                    j += 1;
                } else {
                    j = 0;
                }
            }
            pairIndices[i][1].updateFormattingDeep();
            index = pairIndices[i][1].index;
            j = 1
            while (j > 0) {
                if (this.wrappers[index + j] instanceof eqEd.SuperscriptWrapper
                    || this.wrappers[index + j] instanceof eqEd.SubscriptWrapper
                    || this.wrappers[index + j] instanceof eqEd.SuperscriptAndSubscriptWrapper) {
                    this.wrappers[index + j].updateFormattingDeep();
                    j += 1;
                } else {
                    j = 0;
                }
            }
        }

        var topAlign = 0;
        var bottomAlign = 0;
        var widthSum = 0;
        for (var i = 0; i < this.wrappers.length; i++) {
            this.wrappers[i].left = widthSum + this.padLeft*fontHeight;
            widthSum += this.wrappers[i].width;
            if (this.wrappers[i].topAlign > topAlign) {
                topAlign = this.wrappers[i].topAlign + this.padTop * fontHeight;
                this.maxTopAlignIndex = i;
            }
            if (this.wrappers[i].bottomAlign > bottomAlign) {
                bottomAlign = this.wrappers[i].bottomAlign + this.padBottom * fontHeight;
                this.maxBottomAlignIndex = i;
            }
        }

        if (this instanceof eqEd.StackedFractionDenominatorContainer
        && (this.wrappers[this.maxTopAlignIndex] instanceof eqEd.SquareRootWrapper
         || this.wrappers[this.maxTopAlignIndex] instanceof eqEd.NthRootWrapper)) {
            topAlign += 0.15 * fontHeight;
        }

        this.width = widthSum + (this.padLeft + this.padRight)*fontHeight;
        this.height = topAlign + bottomAlign;
        this.topAlign = topAlign;
        this.bottomAlign = bottomAlign;
        for (var i = 0; i < this.wrappers.length; i++) {
            this.wrappers[i].top = this.topAlign - this.wrappers[i].topAlign;
            this.wrappers[i].jQueryObject.css({
                'left': this.wrappers[i].left,
                'top': this.wrappers[i].top
            })
        }
        this.jQueryObject.removeClass("fontSizeNormal");
        this.jQueryObject.removeClass("fontSizeSmaller");
        this.jQueryObject.removeClass("fontSizeSmallest");
        this.jQueryObject.addClass(this.fontSize);

        this.jQueryObject.css({
            'width': this.width,
            'height': this.height
        })

    }

})();

/////// End Container Class ///////

/////// Begin Wrapper Class ///////

eqEd.Wrapper = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.EquationObject.call(this, symbolSizeConfig);

    this.padLeft = 0;
    this.padTop = 0;
    this.padRight = 0;
    //this.padBottom = 0.05;
    this.padBottom = 0;
    this.topAlign = 0;
    this.bottomAlign = 0;
    this.parent = null;
    this.index = null;
    this.childContainers = [];
    this.childNoncontainers = [];
}

eqEd.Wrapper.prototype = new eqEd.EquationObject(eqEd.noConstructorCall);

(function() {
    eqEd.Wrapper.prototype.updateHeight = function() {
        this.height = this.topAlign + this.bottomAlign;
    }
    eqEd.Wrapper.prototype.updateWidth = function() { }
    eqEd.Wrapper.prototype.updateTopAlign = function() { }
    eqEd.Wrapper.prototype.updateBottomAlign = function() { }
    eqEd.Wrapper.prototype.updateFormatting = function() {
        // It is assumed that child containers have already had their
        // width, height, topAlign, and bottomAlign calculated/applied.

        for (var i = 0; i < this.childNoncontainers.length; i++) {
            this.childNoncontainers[i].updateHeight();
            this.childNoncontainers[i].updateWidth();
            this.childNoncontainers[i].updateTop();
            this.childNoncontainers[i].updateLeft();
            this.childNoncontainers[i].jQueryObject.css({
                'left': this.childNoncontainers[i].left,
                'top': this.childNoncontainers[i].top,
                'height': this.childNoncontainers[i].height,
                'width': this.childNoncontainers[i].width
            });
        }
        for (var i = 0; i < this.childContainers.length; i++) {
            this.childContainers[i].updateLeft();
            this.childContainers[i].updateTop();
            this.childContainers[i].jQueryObject.css({
                'left': this.childContainers[i].left,
                'top': this.childContainers[i].top
            });
        }

        this.updateWidth();
        this.updateTopAlign();
        this.updateBottomAlign();
        this.updateHeight();

        this.jQueryObject.css({
            'height': this.height,
            'width': this.width
        });
        /*
        if (this.index !== this.parent.wrappers.length - 1) {
            var nextWrapper = this.parent.wrappers[this.index + 1];
            if (nextWrapper instanceof eqEd.SuperscriptWrapper
             || nextWrapper instanceof eqEd.SubscriptWrapper
             || nextWrapper instanceof eqEd.SuperscriptAndSubscriptWrapper) {
                //nextWrapper.updateFormatting();
                nextWrapper.updateFormattingDeep();
            }
        }
        */
    };
    eqEd.Wrapper.prototype.updateFormattingDeep = function() {
        /* This section of code updates the nested wrapper/container properties
        ** within the inserted wrappers, based on the changed font size of the 
        ** root container.
        */

        // This needs updated with a list of all containers within wrapper[index]
        // ordered from shallowest to deepest nesting. 
        var containerList = [];

        //I will use a breadth first search to populate containerList.
        var wrappersOnSameLevel = [];
        wrappersOnSameLevel.push(this);
        while (wrappersOnSameLevel.length > 0) {
            var containersOnSameLevel = [];
            for (var i = 0; i < wrappersOnSameLevel.length; i++) {
                containersOnSameLevel = containersOnSameLevel.concat(wrappersOnSameLevel[i].childContainers);
            }
            containerList = containerList.concat(containersOnSameLevel);
            wrappersOnSameLevel = [];
            for (var i = 0; i < containersOnSameLevel.length; i++) {
                wrappersOnSameLevel = wrappersOnSameLevel.concat(containersOnSameLevel[i].wrappers);
            }
        }
        if (containerList.length > 0) {
            _.invoke(containerList, "updateFontSize");

            // Now the containers are listed from deepest to shallowest.
            containerList.reverse();

            for (var i = 0; i < containerList.length; i++) {
                _.invoke(containerList[i].wrappers, "updateFormatting");
                containerList[i].updateFormatting();
            }
        }

        // The top level wrapper needs to have its formatting updated.
        this.updateFormatting();
        /*
        if (this.index !== this.parent.wrappers.length - 1) {
            var nextWrapper = this.parent.wrappers[this.index + 1];
            if (nextWrapper instanceof eqEd.SuperscriptWrapper
             || nextWrapper instanceof eqEd.SubscriptWrapper
             || nextWrapper instanceof eqEd.SuperscriptAndSubscriptWrapper) {
                //nextWrapper.updateFormatting();
                nextWrapper.updateFormattingDeep();
            }
        }
        */
    }

})();

/////// End Wrapper Class ///////

/////// Begin SymbolWrapper Class ///////
eqEd.SymbolWrapper = function(symbolSizeConfig, character) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Wrapper.call(this, symbolSizeConfig);

    this.symbol = new eqEd.Symbol(symbolSizeConfig, character);
    this.jQueryObject.append(this.symbol.jQueryObject);
    this.symbol.parent = this;
    this.childNoncontainers = [this.symbol];

    this.padLeft = 0;
    this.padTop = 0.0;//0.15;
    this.padRight = 0;
    this.padBottom = 0.05;//-0.10;
}

eqEd.SymbolWrapper.prototype = new eqEd.Wrapper(eqEd.noConstructorCall);
(function() {
    eqEd.SymbolWrapper.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        var characterWidth = this.symbolSizeConfig.width[this.symbol.character][this.parent.fontSize];
        this.width = characterWidth + (this.padLeft + this.padRight)*fontHeight;
    }
    eqEd.SymbolWrapper.prototype.updateTopAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.topAlign = this.symbol.height * 0.5 + this.padTop * fontHeight;
    }
    eqEd.SymbolWrapper.prototype.updateBottomAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.bottomAlign = this.symbol.height * 0.5 + this.padBottom * fontHeight;
    }
    eqEd.SymbolWrapper.prototype.buildHtmlRepresentation = function() {
        return '<div class="wrapper symbolWrapper"></div>';
    }
})();
/////// End SymbolWrapper Class ///////

/////// Begin Symbol Class ///////

eqEd.Symbol = function(symbolSizeConfig, character) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    this.character = character;
    this.fontStyle = symbolSizeConfig.getFontStyleForCharacter(character);

    // Superclass constructor needs to get called after character and fontStyle are defined,
    // because the object method buildHtmlRepresentation depends on them.
    eqEd.EquationObject.call(this, symbolSizeConfig);

    // line-height seems to be messed up in IE 9+
    if (IEVersion >= 9) {
        this.jQueryObject.css("line-height", "normal");
    }

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTopItalic = 0.05;
    this.adjustTop = 0;
}

eqEd.Symbol.prototype = new eqEd.EquationObject(eqEd.noConstructorCall);
(function() {
    eqEd.Symbol.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        if (this.fontStyle === "fontItalic")  {
            this.top = (this.parent.padTop + this.adjustTopItalic)*fontHeight;
        } else {
            this.top = (this.parent.padTop + this.adjustTop)*fontHeight;
        }
    }
    eqEd.Symbol.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.left = (this.parent.padLeft + this.adjustLeft)*fontHeight;
    }
    eqEd.Symbol.prototype.updateWidth = function() {
        var characterWidth = this.symbolSizeConfig.width[this.character][this.parent.parent.fontSize];
        this.width = characterWidth;
    }
    eqEd.Symbol.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = fontHeight;
    }
    eqEd.Symbol.prototype.buildHtmlRepresentation = function() {
        return '<div class="symbol ' + this.fontStyle + '">' + this.character + '</div>';
    }
})();

/////// End Symbol Class ///////

/////// Begin EmptyContainerWrapper Class ///////

eqEd.EmptyContainerWrapper = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Wrapper.call(this, symbolSizeConfig);

}

eqEd.EmptyContainerWrapper.prototype = new eqEd.Wrapper(eqEd.noConstructorCall);

/////// End EmptyContainerWrapper Class ///////

/////// Begin TopLevelEmptyContainerWrapper Class ///////

eqEd.TopLevelEmptyContainerWrapper = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.EmptyContainerWrapper.call(this, symbolSizeConfig);

    this.topLevelEmptyContainerMessage = new eqEd.TopLevelEmptyContainerMessage(symbolSizeConfig);
    this.topLevelEmptyContainerMessage.parent = this;
    this.jQueryObject.append(this.topLevelEmptyContainerMessage.jQueryObject);
    this.childNoncontainers = [this.topLevelEmptyContainerMessage];

    this.padLeft = 0.3;
    this.padRight = 0.125;
    this.padTop = 0;
    //this.padBottom = 0;
}

eqEd.TopLevelEmptyContainerWrapper.prototype = new eqEd.EmptyContainerWrapper(eqEd.noConstructorCall);
(function() {
    eqEd.TopLevelEmptyContainerWrapper.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.width = this.topLevelEmptyContainerMessage.width + (this.padLeft + this.padRight)*fontHeight;
    }
    eqEd.TopLevelEmptyContainerWrapper.prototype.updateTopAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.topAlign = (0.5 + this.padTop) * fontHeight;
    }
    eqEd.TopLevelEmptyContainerWrapper.prototype.updateBottomAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.bottomAlign = (0.5 + this.padBottom) * fontHeight;
    }
    eqEd.TopLevelEmptyContainerWrapper.prototype.buildHtmlRepresentation = function() {
        return '<div class="wrapper emptyContainerWrapper topLevelEmptyContainerWrapper"></div>';
    }
})();
/////// End TopLevelEmptyContainerWrapper Class ///////

/////// Begin TopLevelEmptyContainerMessage Class ///////

eqEd.TopLevelEmptyContainerMessage = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }

    // Need to set message before superclass call b/c I need it for buildHtmlRepresentation.
    this.message = "Enter&nbsp;Your&nbsp;Equation&nbsp;Here";

    eqEd.EquationObject.call(this, symbolSizeConfig);

    this.parent = null;
    var fontHeight = this.symbolSizeConfig.height["fontSizeNormal"];
    this.fontSize = fontHeight*0.4;
    this.jQueryObject.css("font-size", Math.ceil(this.fontSize) + "px");
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.TopLevelEmptyContainerMessage.prototype = new eqEd.EquationObject(eqEd.noConstructorCall);
(function() {
    eqEd.TopLevelEmptyContainerMessage.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        // Center the span, and then if desired add some adjustment.
        this.top = (fontHeight - this.height)*0.5 + (this.parent.padTop + this.adjustTop)*fontHeight;
    }
    eqEd.TopLevelEmptyContainerMessage.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.left = (this.parent.padLeft + this.adjustLeft)*fontHeight;
    }
    eqEd.TopLevelEmptyContainerMessage.prototype.updateWidth = function() {
        this.width = this.jQueryObject.width();
    }
    eqEd.TopLevelEmptyContainerMessage.prototype.updateHeight = function() {
        this.height = this.jQueryObject.height();
    }
    eqEd.TopLevelEmptyContainerMessage.prototype.buildHtmlRepresentation = function() {
        return '<span class="topLevelEmptyContainerMessage">' + this.message + '</span>';
    }
})();

/////// End TopLevelEmptyContainerMessage Class ///////

/////// Begin SquareEmptyContainerWrapper Class ///////

eqEd.SquareEmptyContainerWrapper = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.EmptyContainerWrapper.call(this, symbolSizeConfig);

    this.squareEmptyContainer = new eqEd.SquareEmptyContainer(symbolSizeConfig);
    this.jQueryObject.append(this.squareEmptyContainer.jQueryObject);
    this.squareEmptyContainer.parent = this;

    this.padLeft = 0.05;
    this.padTop = 0;
    this.padRight = 0.05;
    //this.padBottom = 0;
    this.childContainers = [this.squareEmptyContainer];
}

eqEd.SquareEmptyContainerWrapper.prototype = new eqEd.EmptyContainerWrapper(eqEd.noConstructorCall);
(function() {
    eqEd.SquareEmptyContainerWrapper.prototype.updateTop = function() { }
    eqEd.SquareEmptyContainerWrapper.prototype.updateLeft = function() {
        // The parent Wrapper class has left placement logic common to all wrappers.
        eqEd.Wrapper.prototype.updateLeft.call(this);
    }
    eqEd.SquareEmptyContainerWrapper.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.width = this.squareEmptyContainer.width + 2*this.squareEmptyContainer.borderWidth + (this.padLeft + this.padRight)*fontHeight;
    }
    eqEd.SquareEmptyContainerWrapper.prototype.updateTopAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.topAlign = (0.5 + this.padTop) * fontHeight;
    }
    eqEd.SquareEmptyContainerWrapper.prototype.updateBottomAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.bottomAlign = (0.5 + this.padBottom) * fontHeight;
    }
    eqEd.SquareEmptyContainerWrapper.prototype.buildHtmlRepresentation = function() {
        return '<div class="wrapper emptyContainerWrapper squareEmptyContainerWrapper"></div>';
    }
})();

/////// End SquareEmptyContainerWrapper Class ///////

/////// Begin SquareEmptyContainer Class ///////

eqEd.SquareEmptyContainer = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Container.call(this, symbolSizeConfig);

    // This will get overwritten when the EmptyContainerWrapper is added to a container.
    this.fontSize = "fontSizeNormal";
    this.parent = null;
    this.squareEmptyContainerFillerWrapper = new eqEd.SquareEmptyContainerFillerWrapper(symbolSizeConfig);
    this.addWrappers([0, this.squareEmptyContainerFillerWrapper]);
    this.padLeft = 0;
    this.padRight = 0;
    this.adjustLeft = 0;
    this.adjustTop = 0;
    this.borderWidth = 4;
    this.jQueryObject.css('border-width', this.borderWidth + 'px');
}

eqEd.SquareEmptyContainer.prototype = new eqEd.Container(eqEd.noConstructorCall);

(function() {
    eqEd.SquareEmptyContainer.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.fontSize];
        if (this.parent !== null) {
            this.left = (this.parent.padLeft + this.adjustLeft) * fontHeight;
        } else {
            this.left = 0;
        }
    }
    eqEd.SquareEmptyContainer.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.fontSize];
        this.top = 0.5*fontHeight - 0.5*this.squareEmptyContainerFillerWrapper.height - this.borderWidth;
    }
    eqEd.SquareEmptyContainer.prototype.updateWidth = function() {
        this.width = this.squareEmptyContainerFillerWrapper.width;// + this.borderWidth*2
    }
    eqEd.SquareEmptyContainer.prototype.updateFontSize = function() {
        this.fontSize = this.parent.parent.fontSize;
    }
    eqEd.SquareEmptyContainer.prototype.buildHtmlRepresentation = function() {
        return '<div class="container squareEmptyContainer"></div>';
    }
})();   
/////// End SquareEmptyContainer Class ///////

/////// Begin SquareEmptyContainerFillerWrapper Class ///////

eqEd.SquareEmptyContainerFillerWrapper = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Wrapper.call(this, symbolSizeConfig);

    this.sideLength = 0.6;
}

eqEd.SquareEmptyContainerFillerWrapper.prototype = new eqEd.Wrapper(eqEd.noConstructorCall);
(function() {
    eqEd.SquareEmptyContainerFillerWrapper.prototype.updateTop = function() { }
    eqEd.SquareEmptyContainerFillerWrapper.prototype.updateLeft = function() { }
    eqEd.SquareEmptyContainerFillerWrapper.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.width = this.sideLength * fontHeight;
    }
    eqEd.SquareEmptyContainerFillerWrapper.prototype.updateTopAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.topAlign = 0.5 * this.sideLength * fontHeight;
    }
    eqEd.SquareEmptyContainerFillerWrapper.prototype.updateBottomAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.bottomAlign = 0.5 * this.sideLength * fontHeight;
    }
    eqEd.SquareEmptyContainerFillerWrapper.prototype.buildHtmlRepresentation = function() {
        return '<div class="wrapper squareEmptyContainerFillerWrapper"></div>';
    }
})();

/////// End SquareEmptyContainerFillerWrapper Class ///////

/////// Begin StackedFractionWrapper Class ///////

eqEd.StackedFractionWrapper = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Wrapper.call(this, symbolSizeConfig);

    this.stackedFractionNumeratorContainer = new eqEd.StackedFractionNumeratorContainer(symbolSizeConfig);
    this.stackedFractionDenominatorContainer = new eqEd.StackedFractionDenominatorContainer(symbolSizeConfig);
    this.stackedFractionHorizontalBar = new eqEd.StackedFractionHorizontalBar(symbolSizeConfig);
    this.jQueryObject.append(this.stackedFractionNumeratorContainer.jQueryObject);
    this.jQueryObject.append(this.stackedFractionDenominatorContainer.jQueryObject);
    this.jQueryObject.append(this.stackedFractionHorizontalBar.jQueryObject);
    this.stackedFractionNumeratorContainer.parent = this;
    this.stackedFractionDenominatorContainer.parent = this;
    this.stackedFractionHorizontalBar.parent = this;
    this.childNoncontainers = [this.stackedFractionHorizontalBar];
    this.childContainers = [this.stackedFractionNumeratorContainer, this.stackedFractionDenominatorContainer];

    this.padLeft = 0.05;
    this.padTop = 0;
    this.padRight = 0.05;
    //this.padBottom = 0;
}

eqEd.StackedFractionWrapper.prototype = new eqEd.Wrapper(eqEd.noConstructorCall);
(function() {
    eqEd.StackedFractionWrapper.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.width = this.stackedFractionHorizontalBar.width + (this.padLeft + this.padRight)*fontHeight;
    }
    eqEd.StackedFractionWrapper.prototype.updateTopAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.topAlign = 0.5*this.stackedFractionHorizontalBar.height + this.stackedFractionNumeratorContainer.height + this.padTop * fontHeight;
    }
    eqEd.StackedFractionWrapper.prototype.updateBottomAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.bottomAlign = 0.5*this.stackedFractionHorizontalBar.height + this.stackedFractionDenominatorContainer.height + this.padBottom * fontHeight;
    }
    eqEd.StackedFractionWrapper.prototype.buildHtmlRepresentation = function() {
        return '<div class="wrapper stackedFractionWrapper"></div>';
    }
})();

/////// End StackedFractionWrapper Class ///////

/////// Begin StackedFractionNumeratorContainer Class ///////

eqEd.StackedFractionNumeratorContainer = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Container.call(this, symbolSizeConfig);

    this.parent = null;
    this.squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(symbolSizeConfig);
    this.addWrappers([0, this.squareEmptyContainerWrapper]);
    //this.padLeft = 0;
    //this.padRight = 0;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.StackedFractionNumeratorContainer.prototype = new eqEd.Container(eqEd.noConstructorCall);

(function() {
    eqEd.StackedFractionNumeratorContainer.prototype.updateLeft = function() {
        // All three of denominator, numerator, and horizontalBar widths need updated before this is called.
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var maxNumDenomWidth = (this.width > this.parent.stackedFractionDenominatorContainer.width) ? this.width : this.parent.stackedFractionDenominatorContainer.width;
        this.left = 0.5*(maxNumDenomWidth - this.width) + (0.5*this.parent.stackedFractionHorizontalBar.exceedsMaxNumDenomWidth + this.parent.padLeft + this.adjustLeft) * fontHeight;
    }
    eqEd.StackedFractionNumeratorContainer.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.top = (this.parent.padTop + this.adjustTop) * fontHeight;
    }
    eqEd.StackedFractionNumeratorContainer.prototype.updateFontSize = function() {
        if (this.parent.parent.fontSize === "fontSizeSmaller" || this.parent.parent.fontSize === "fontSizeSmallest") {
            this.fontSize = "fontSizeSmallest";
        } else {
            if (this.parent.parent.parent instanceof eqEd.StackedFractionWrapper) {
                this.fontSize = "fontSizeSmaller";
            } else {
                this.fontSize = "fontSizeNormal";
            }
        }
    }
    eqEd.StackedFractionNumeratorContainer.prototype.buildHtmlRepresentation = function() {
        return '<div class="container stackedFractionNumeratorContainer"></div>';
    }
})();   
/////// End StackedFractionNumeratorContainer Class ///////

/////// Begin StackedFractionDenominatorContainer Class ///////

eqEd.StackedFractionDenominatorContainer = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Container.call(this, symbolSizeConfig);

    this.parent = null;
    this.squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(symbolSizeConfig);
    this.addWrappers([0, this.squareEmptyContainerWrapper]);
    //this.padLeft = 0;
    //this.padRight = 0;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.StackedFractionDenominatorContainer.prototype = new eqEd.Container(eqEd.noConstructorCall);

(function() {
    eqEd.StackedFractionDenominatorContainer.prototype.updateLeft = function() {
        // All three of denominator, numerator, and horizontalBar widths need updated before this is called.
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var maxNumDenomWidth = (this.width > this.parent.stackedFractionNumeratorContainer.width) ? this.width : this.parent.stackedFractionNumeratorContainer.width;
        this.left = 0.5*(maxNumDenomWidth - this.width) + (0.5*this.parent.stackedFractionHorizontalBar.exceedsMaxNumDenomWidth + this.parent.padLeft + this.adjustLeft) * fontHeight;
    }
    eqEd.StackedFractionDenominatorContainer.prototype.updateTop = function() {
        // I'm puttin this here because it gets called everytime the container gets updated
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.top = this.parent.stackedFractionNumeratorContainer.height + (this.parent.stackedFractionHorizontalBar.barHeightRatio + this.parent.padTop + this.adjustTop) * fontHeight;
    }
    eqEd.StackedFractionDenominatorContainer.prototype.updateFontSize = function() {
        if (this.parent.parent.fontSize === "fontSizeSmaller" || this.parent.parent.fontSize === "fontSizeSmallest") {
            this.fontSize = "fontSizeSmallest";
        } else {
            if (this.parent.parent.parent instanceof eqEd.StackedFractionWrapper) {
                this.fontSize = "fontSizeSmaller";
            } else {
                this.fontSize = "fontSizeNormal";
            }
        }
    }
    eqEd.StackedFractionDenominatorContainer.prototype.buildHtmlRepresentation = function() {
        return '<div class="container stackedFractionDenominatorContainer"></div>';
    }
})();   
/////// End StackedFractionNumeratorContainer Class ///////

/////// Begin StackedFractionHorizontalBar Class ///////

eqEd.StackedFractionHorizontalBar = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.EquationObject.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
    this.exceedsMaxNumDenomWidth = 0.25;
    this.barHeightRatio = 0.05;
}

eqEd.StackedFractionHorizontalBar.prototype = new eqEd.EquationObject(eqEd.noConstructorCall);
(function() {
    eqEd.StackedFractionHorizontalBar.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.top = this.parent.stackedFractionNumeratorContainer.height + (this.parent.padTop + this.adjustTop)*fontHeight;
    }
    eqEd.StackedFractionHorizontalBar.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.left = (this.parent.padLeft + this.adjustLeft)*fontHeight;
    }
    eqEd.StackedFractionHorizontalBar.prototype.updateWidth = function() {
        // Requires sibling numerator and denominator widths to have already been calculated.

        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var maxNumDenomWidth = (this.parent.stackedFractionDenominatorContainer.width > this.parent.stackedFractionNumeratorContainer.width) ? this.parent.stackedFractionDenominatorContainer.width : this.parent.stackedFractionNumeratorContainer.width;
        this.width = maxNumDenomWidth + this.exceedsMaxNumDenomWidth * fontHeight;
    }
    eqEd.StackedFractionHorizontalBar.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = this.barHeightRatio * fontHeight;
    }
    eqEd.StackedFractionHorizontalBar.prototype.buildHtmlRepresentation = function() {
        return '<div class="stackedFractionHorizontalBar"></span>';
    }
})();

/////// End StackedFractionHorizontalBar Class ///////

/////// Begin SuperscriptWrapper Class ///////

eqEd.SuperscriptWrapper = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Wrapper.call(this, symbolSizeConfig);

    this.superscriptContainer = new eqEd.SuperscriptContainer(symbolSizeConfig);
    this.jQueryObject.append(this.superscriptContainer.jQueryObject);
    this.superscriptContainer.parent = this;
    this.childContainers = [this.superscriptContainer];
    this.baseWrapperOverlap = 0.75;

    this.padLeft = 0;
    this.padTop = 0;
    this.padRight = 0.00;
    //this.padBottom = 0;
}

eqEd.SuperscriptWrapper.prototype = new eqEd.Wrapper(eqEd.noConstructorCall);
(function() {
    eqEd.SuperscriptWrapper.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.width = this.superscriptContainer.width + (this.padLeft + this.padRight)*fontHeight;
    }
    eqEd.SuperscriptWrapper.prototype.updateTopAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        var baseWrapper;
        var base;
        if (this.index !== 0) {
            baseWrapper = this.parent.wrappers[this.index - 1];
            if (baseWrapper instanceof eqEd.SuperscriptWrapper || baseWrapper instanceof eqEd.SuperscriptAndSubscriptWrapper) {
                base = baseWrapper.superscriptContainer;
                fontHeight = this.symbolSizeConfig.height[base.fontSize];
            } else {
                if (baseWrapper instanceof eqEd.SquareRootWrapper) {
                    var baseWrapperOverlap = (this.superscriptContainer.bottomAlign / baseWrapper.height);
                    if (baseWrapperOverlap <= 0.9) {
                        this.baseWrapperOverlap = baseWrapperOverlap;
                    } else {
                        this.baseWrapperOverlap = 0.9;
                    }
                }
                if (baseWrapper instanceof eqEd.NthRootWrapper) {
                    var baseWrapperOverlap = (this.superscriptContainer.bottomAlign / baseWrapper.nthRootDiagonal.height);
                    if (baseWrapperOverlap <= 0.9) {
                        this.baseWrapperOverlap = baseWrapperOverlap;
                    } else {
                        this.baseWrapperOverlap = 0.9;
                    }
                }
                base = baseWrapper;
            }
        } else {
            // The superscript wrapper is the first entry in the container.
            baseWrapper = new eqEd.SymbolWrapper(this.symbolSizeConfig, 'a');
            baseWrapper.parent = this.parent;
            baseWrapper.index = null;
            baseWrapper.updateFormatting();
            base = baseWrapper;
        }
        if (baseWrapper instanceof eqEd.NthRootWrapper) {
            if (this.superscriptContainer.adjustTop*fontHeight + this.superscriptContainer.bottomAlign > baseWrapper.nthRootDiagonal.height*this.baseWrapperOverlap) {
                this.topAlign = this.superscriptContainer.height - (baseWrapper.nthRootDiagonal.height*this.baseWrapperOverlap - (base.topAlign - (base.height - baseWrapper.nthRootDiagonal.height)));
            } else {
                this.topAlign = (baseWrapper.topAlign - (base.height - baseWrapper.nthRootDiagonal.height)) + this.superscriptContainer.height - this.superscriptContainer.bottomAlign + (this.padTop - this.superscriptContainer.adjustTop)*fontHeight;
            }
        } else {
            if (this.superscriptContainer.adjustTop*fontHeight + this.superscriptContainer.bottomAlign > base.height*this.baseWrapperOverlap) {
                //if ( this.superscriptContainer.height > baseWrapper.topAlign)
                this.topAlign = this.superscriptContainer.height - (base.height*this.baseWrapperOverlap - baseWrapper.topAlign);
            } else {
                this.topAlign = baseWrapper.topAlign + this.superscriptContainer.height - this.superscriptContainer.bottomAlign + (this.padTop - this.superscriptContainer.adjustTop)*fontHeight;
            }
        }
    }
    eqEd.SuperscriptWrapper.prototype.updateBottomAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        var baseWrapper;
        if (this.index !== 0) {
            baseWrapper = this.parent.wrappers[this.index - 1];
        } else {
            // The superscript wrapper is the first entry in the container.
            baseWrapper = new eqEd.SymbolWrapper(this.symbolSizeConfig, 'a');
            baseWrapper.parent = this.parent;
            baseWrapper.index = null;
            baseWrapper.updateFormatting();
        }
        this.bottomAlign = baseWrapper.bottomAlign;
    }
    eqEd.SuperscriptWrapper.prototype.buildHtmlRepresentation = function() {
        return '<div class="wrapper superscriptWrapper"></div>';
    }
})();

/////// End SuperscriptWrapper Class ///////

/////// Begin SuperscriptContainer Class ///////

eqEd.SuperscriptContainer = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Container.call(this, symbolSizeConfig);

    this.parent = null;
    this.squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(symbolSizeConfig);
    this.addWrappers([0, this.squareEmptyContainerWrapper]);
    //this.padLeft = 0;
    //this.padRight = 0;
    this.adjustTop = 0.2;
    this.adjustLeft = 0;
}

eqEd.SuperscriptContainer.prototype = new eqEd.Container(eqEd.noConstructorCall);

(function() {
    eqEd.SuperscriptContainer.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.left = (this.parent.padLeft + this.adjustLeft) * fontHeight;
    }
    eqEd.SuperscriptContainer.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.sfontSize];
        this.top = this.parent.padTop * fontHeight;
    }
    eqEd.SuperscriptContainer.prototype.updateFontSize = function() {
        var baseWrapper;
        if (this.parent.index !== 0) {
            baseWrapper = this.parent.parent.wrappers[this.parent.index - 1];
        } else {
            baseWrapper = new eqEd.SymbolWrapper(this.symbolSizeConfig, 'a');
            baseWrapper.parent = this.parent.parent;
            baseWrapper.index = null;
            baseWrapper.updateFormatting();
        }
        if (this.parent.parent.fontSize === "fontSizeSmaller" || this.parent.parent.fontSize === "fontSizeSmallest") {
            this.fontSize = "fontSizeSmallest";
        } else {
            if (baseWrapper instanceof eqEd.SuperscriptWrapper
             || baseWrapper instanceof eqEd.SuperscriptAndSubscriptWrapper) {
                this.fontSize = "fontSizeSmallest";
            } else {
                this.fontSize = "fontSizeSmaller";
            }
        }

    }
    eqEd.SuperscriptContainer.prototype.buildHtmlRepresentation = function() {
        return '<div class="container superscriptContainer"></div>';
    }
})();   
/////// End SuperscriptContainer Class ///////

/////// Begin SubscriptWrapper Class ///////

eqEd.SubscriptWrapper = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Wrapper.call(this, symbolSizeConfig);

    this.subscriptContainer = new eqEd.SubscriptContainer(symbolSizeConfig);
    this.jQueryObject.append(this.subscriptContainer.jQueryObject);
    this.subscriptContainer.parent = this;
    this.childContainers = [this.subscriptContainer];

    this.padLeft = 0;
    this.padTop = 0;
    this.padRight = 0;
    //this.padBottom = 0;
}

eqEd.SubscriptWrapper.prototype = new eqEd.Wrapper(eqEd.noConstructorCall);
(function() {
    eqEd.SubscriptWrapper.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.width = this.subscriptContainer.width + (this.padLeft + this.padRight)*fontHeight;
    }
    eqEd.SubscriptWrapper.prototype.updateTopAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        var baseWrapper;
        if (this.index !== 0) {
            baseWrapper = this.parent.wrappers[this.index - 1];
        } else {
            // The subscript wrapper is the first entry in the container.
            baseWrapper = new eqEd.SymbolWrapper(this.symbolSizeConfig, 'a');
            baseWrapper.parent = this.parent;
            baseWrapper.index = null;
            baseWrapper.updateFormatting();
        }
        this.topAlign = baseWrapper.topAlign + this.padTop*fontHeight;
    }
    eqEd.SubscriptWrapper.prototype.updateBottomAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        var baseWrapper;
        var base;
        if (this.index !== 0) {
            baseWrapper = this.parent.wrappers[this.index - 1];
            if (baseWrapper instanceof eqEd.SubscriptWrapper) {
                base = baseWrapper.subscriptContainer;
            } else {
                base = baseWrapper;
            }
        } else {
            // The subscript wrapper is the first entry in the container.
            baseWrapper = new eqEd.SymbolWrapper(this.symbolSizeConfig, 'a');
            baseWrapper.parent = this.parent;
            baseWrapper.index = null;
            baseWrapper.updateFormatting();
            base = baseWrapper;
        }
        var fontHeightNested = this.symbolSizeConfig.height[this.subscriptContainer.fontSize];
        this.bottomAlign = this.subscriptContainer.height - 0.5*fontHeightNested + baseWrapper.bottomAlign + (this.padTop + this.subscriptContainer.adjustTop)*fontHeight;
    }
    eqEd.SubscriptWrapper.prototype.buildHtmlRepresentation = function() {
        return '<div class="wrapper subscriptWrapper"></div>';
    }
})();

/////// End SubscriptWrapper Class ///////

/////// Begin SubscriptContainer Class ///////

eqEd.SubscriptContainer = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Container.call(this, symbolSizeConfig);

    this.parent = null;
    this.squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(symbolSizeConfig);
    this.addWrappers([0, this.squareEmptyContainerWrapper]);
    //this.padLeft = 0;
    //this.padRight = 0;
    this.adjustLeft = 0;
    this.adjustTop = -0.2;
}

eqEd.SubscriptContainer.prototype = new eqEd.Container(eqEd.noConstructorCall);

(function() {
    eqEd.SubscriptContainer.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.fontSize];
        this.left = (this.parent.padLeft + this.adjustLeft) * fontHeight;
    }
    eqEd.SubscriptContainer.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var baseWrapper;
        if (this.parent.index !== 0) {
            baseWrapper = this.parent.parent.wrappers[this.parent.index - 1];
        } else {
            baseWrapper = new eqEd.SymbolWrapper(this.symbolSizeConfig, 'a');
            baseWrapper.parent = this.parent.parent;
            baseWrapper.index = null;
            baseWrapper.updateFormatting();
        }
        var fontHeightNested = this.symbolSizeConfig.height[this.fontSize];
        //this.top = baseWrapper.height - 0.5*fontHeightNested + (this.parent.padTop + this.adjustTop) * fontHeight;
        this.parent.updateTopAlign();
        this.top = this.parent.topAlign + baseWrapper.bottomAlign - 0.5*fontHeightNested + (this.parent.padTop + this.adjustTop) * fontHeight;
    }
    eqEd.SubscriptContainer.prototype.updateFontSize = function() {
        var baseWrapper;
        if (this.parent.index !== 0) {
            baseWrapper = this.parent.parent.wrappers[this.parent.index - 1];
        } else {
            baseWrapper = new eqEd.SymbolWrapper(this.symbolSizeConfig, 'a');
            baseWrapper.parent = this.parent.parent;
            baseWrapper.index = null;
            baseWrapper.updateFormatting();
        }
        if (this.parent.parent.fontSize === "fontSizeSmaller" || this.parent.parent.fontSize === "fontSizeSmallest") {
            this.fontSize = "fontSizeSmallest";
        } else {
            if (baseWrapper instanceof eqEd.SubscriptWrapper
             || baseWrapper instanceof eqEd.SuperscriptAndSubscriptWrapper) {
                this.fontSize = "fontSizeSmallest";
            } else {
                this.fontSize = "fontSizeSmaller";
            }
        }

    }
    eqEd.SubscriptContainer.prototype.buildHtmlRepresentation = function() {
        return '<div class="container subscriptContainer"></div>';
    }
})();   
/////// End SubscriptContainer Class ///////

/////// Begin SuperscriptAndSubscriptWrapper Class ///////

eqEd.SuperscriptAndSubscriptWrapper = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Wrapper.call(this, symbolSizeConfig);
    this.superscriptContainer = new eqEd.SuperscriptContainer(symbolSizeConfig)
    this.subscriptContainer = new eqEd.SubscriptContainer(symbolSizeConfig);
    this.subscriptContainer.adjustTop = -0.15;
    this.jQueryObject.append(this.superscriptContainer.jQueryObject);
    this.jQueryObject.append(this.subscriptContainer.jQueryObject);
    this.superscriptContainer.parent = this;
    this.subscriptContainer.parent = this;
    this.childContainers = [this.superscriptContainer, this.subscriptContainer];
    this.baseWrapperOverlap = 0.75;

    this.padLeft = 0;
    this.padTop = 0;
    this.padRight = 0;
    //this.padBottom = 0;
}

eqEd.SuperscriptAndSubscriptWrapper.prototype = new eqEd.Wrapper(eqEd.noConstructorCall);
(function() {
    eqEd.SuperscriptAndSubscriptWrapper.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        var maxWidth = (this.superscriptContainer.width > this.subscriptContainer.width) ? this.superscriptContainer.width : this.subscriptContainer.width;
        this.width = maxWidth + (this.padLeft + this.padRight)*fontHeight;
    }
    eqEd.SuperscriptAndSubscriptWrapper.prototype.updateTopAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        var baseWrapper;
        var base;
        if (this.index !== 0) {
            baseWrapper = this.parent.wrappers[this.index - 1];
            if (baseWrapper instanceof eqEd.SuperscriptWrapper) {
                base = baseWrapper.superscriptContainer;
            } else {
                base = baseWrapper;
            }
        } else {
            // The superscript wrapper is the first entry in the container.
            baseWrapper = new eqEd.SymbolWrapper(this.symbolSizeConfig, 'a');
            baseWrapper.parent = this.parent;
            baseWrapper.index = null;
            baseWrapper.updateFormatting();
            base = baseWrapper;
        }
        if (this.superscriptContainer.adjustTop*fontHeight + this.superscriptContainer.bottomAlign > base.height*this.baseWrapperOverlap) {
            this.topAlign = this.superscriptContainer.height - (base.height*this.baseWrapperOverlap - base.topAlign);
        } else {
            this.topAlign = baseWrapper.topAlign + this.superscriptContainer.height - this.superscriptContainer.bottomAlign + (this.padTop - this.superscriptContainer.adjustTop)*fontHeight;
        }
    }
    eqEd.SuperscriptAndSubscriptWrapper.prototype.updateBottomAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        var baseWrapper;
        var base;
        if (this.index !== 0) {
            baseWrapper = this.parent.wrappers[this.index - 1];
            if (baseWrapper instanceof eqEd.SubscriptWrapper || baseWrapper instanceof eqEd.SuperscriptAndSubscriptWrapper) {
                base = baseWrapper.subscriptContainer;
            } else {
                base = baseWrapper;
            }
        } else {
            // The subscript wrapper is the first entry in the container.
            baseWrapper = new eqEd.SymbolWrapper(this.symbolSizeConfig, 'a');
            baseWrapper.parent = this.parent;
            baseWrapper.index = null;
            baseWrapper.updateFormatting();
            base = baseWrapper;
        }
        var fontHeightNested = this.symbolSizeConfig.height[this.subscriptContainer.fontSize];
        this.bottomAlign = this.subscriptContainer.height - 0.5*fontHeightNested + baseWrapper.bottomAlign + (this.padTop + this.subscriptContainer.adjustTop)*fontHeight;
    }
    eqEd.SuperscriptAndSubscriptWrapper.prototype.buildHtmlRepresentation = function() {
        return '<div class="wrapper superscriptAndSubscriptWrapper"></div>';
    }
})();

/////// End SuperscriptAndSubscriptWrapper Class ///////

/////// Begin SquareRootWrapper Class ///////

eqEd.SquareRootWrapper = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Wrapper.call(this, symbolSizeConfig);
    this.radicandContainer = new eqEd.SquareRootRadicandContainer(symbolSizeConfig);
    this.squareRootOverBar = new eqEd.SquareRootOverBar(symbolSizeConfig);
    this.radical = new eqEd.SquareRootRadical(symbolSizeConfig);
    this.squareRootDiagonal = new eqEd.SquareRootDiagonal(symbolSizeConfig);
    this.jQueryObject.append(this.radicandContainer.jQueryObject);
    this.jQueryObject.append(this.squareRootOverBar.jQueryObject);
    this.jQueryObject.append(this.radical.jQueryObject);
    this.jQueryObject.append(this.squareRootDiagonal.jQueryObject);
    this.radicandContainer.parent = this;
    this.squareRootOverBar.parent = this;
    this.radical.parent = this;
    this.squareRootDiagonal.parent = this;
    this.childContainers = [this.radicandContainer];
    this.childNoncontainers = [this.squareRootDiagonal, this.radical, this.squareRootOverBar];

    this.padBottomWhenParentIsFraction = 0.2;
    this.padLeft = 0.1;
    this.padTop = 0;
    this.padRight = 0.1;
    //this.padBottom = 0;
}

eqEd.SquareRootWrapper.prototype = new eqEd.Wrapper(eqEd.noConstructorCall);
(function() {
    eqEd.SquareRootWrapper.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.width = this.radical.width + this.squareRootDiagonal.width + this.radicandContainer.width + (this.padLeft + this.padRight)*fontHeight;
    }
    eqEd.SquareRootWrapper.prototype.updateTopAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.topAlign = this.radicandContainer.topAlign + this.padTop * fontHeight;
        if (this.radicandContainer.isMaxTopAlignRootWrapper) {
            this.topAlign += this.radicandContainer.padTopMaxChildAlignTopIsRoot * fontHeight;
        } else {
            this.topAlign += this.radicandContainer.padTopMaxChildAlignTopIsNotRoot * fontHeight;
        }
    }
    eqEd.SquareRootWrapper.prototype.updateBottomAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.bottomAlign = this.radicandContainer.bottomAlign + this.padBottom * fontHeight;
        if (this.radicandContainer.isMaxTopAlignRootWrapper) {
            this.bottomAlign += this.radicandContainer.padBottomMaxChildAlignTopIsRoot * fontHeight;
        } else {
            this.bottomAlign += this.radicandContainer.padBottomMaxChildAlignTopIsNotRoot * fontHeight;
        }
        if (this.parent.jQueryObject.hasClass('stackedFractionNumeratorContainer')) {
            this.bottomAlign += this.padBottomWhenParentIsFraction * fontHeight;
        }
    }
    eqEd.SquareRootWrapper.prototype.buildHtmlRepresentation = function() {
        return '<div class="wrapper squareRootWrapper"></div>';
    }
})();

/////// End SquareRootWrapper Class ///////

/////// Begin SquareRootOverBar Class ///////

eqEd.SquareRootOverBar = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.EquationObject.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = -0.06;
    this.adjustTop = 0;
    this.heightRatio = 0.055;
}

eqEd.SquareRootOverBar.prototype = new eqEd.EquationObject(eqEd.noConstructorCall);
(function() {
    eqEd.SquareRootOverBar.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.top = this.parent.padTop * fontHeight;
    }
    eqEd.SquareRootOverBar.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.left = this.parent.radical.width + this.parent.squareRootDiagonal.width + (this.adjustLeft + this.parent.padLeft) * fontHeight;
    }
    eqEd.SquareRootOverBar.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.width = this.parent.radicandContainer.width - this.adjustLeft * fontHeight;
    }
    eqEd.SquareRootOverBar.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = this.heightRatio * fontHeight;
    }
    eqEd.SquareRootOverBar.prototype.buildHtmlRepresentation = function() {
        return '<div class="squareRootOverBar"></div>';
    }
})();

/////// End SquareRootOverBar Class ///////

/////// Begin SquareRootRadical Class ///////

eqEd.SquareRootRadical = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.EquationObject.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0.01;
}

eqEd.SquareRootRadical.prototype = new eqEd.EquationObject(eqEd.noConstructorCall);
(function() {
    eqEd.SquareRootRadical.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.top = this.parent.squareRootDiagonal.height - this.height + (this.adjustTop + this.parent.padTop) * fontHeight;
    };
    eqEd.SquareRootRadical.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.left = (this.adjustLeft + this.parent.padLeft) * fontHeight;
    };
    eqEd.SquareRootRadical.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        if (this.parent.squareRootDiagonal.height < 2 * fontHeight) {
            //this.width = 0.36 * fontHeight;
            this.width = 0.4 * fontHeight;
        } else {
            this.width = 0.5 * fontHeight;
        }
    };
    eqEd.SquareRootRadical.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        if (this.parent.squareRootDiagonal.height < 2 * fontHeight) {
            //this.height = 0.61 * fontHeight;
            this.height = 0.7 * fontHeight;
        } else {
            this.height = 0.75 * fontHeight;
        }
    };
    eqEd.SquareRootRadical.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="squareRootRadical" style="width: 74.842293px; height: 127.48769px;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 74.842293 127.48769" preserveAspectRatio="none"><defs id="defs4"><clipPath clipPathUnits="userSpaceOnUse" id="clipPath3765"><rect style="fill:#b1ded2;fill-opacity:1;stroke:none" id="rect3767" width="74.842293" height="127.62585" x="198.84776" y="668.99451" /></clipPath></defs><g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(-198.84776,-668.99451)"><g clip-path="url(#clipPath3765)"><path d="m 265.30006,796.48219 -47.75994,-111.23309 -14.88621,11.47479 -3.82493,-3.82493 30.28931,-23.46646 44.65864,103.89336 109.8892,-228.9789 c 0.68896,-1.30943 1.89502,-1.96414 3.61817,-1.96415 1.17139,1e-5 2.17069,0.41351 2.99792,1.24052 0.8268,0.82701 1.2403,1.82632 1.24052,2.99791 -2.2e-4,0.68918 -0.0691,1.17161 -0.20676,1.44728 L 273.15667,794.51804 c -0.55144,1.30919 -1.61966,1.96391 -3.20467,1.96415 l -4.65194,0" style="" id="path2987" /></g></g></svg></div>';
        } else {
            img = '<div class="squareRootRadical"><img class="nonHighlightVersion" src="Images/radical.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/radicalHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End SquareRootRadical Class ///////

/////// Begin SquareRootDiagonal Class ///////

eqEd.SquareRootDiagonal = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.EquationObject.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = -0.035;
    this.adjustTop = 0;
}

eqEd.SquareRootDiagonal.prototype = new eqEd.EquationObject(eqEd.noConstructorCall);
(function() {
    eqEd.SquareRootDiagonal.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.top = this.adjustTop * fontHeight;
    };
    eqEd.SquareRootDiagonal.prototype.updateLeft = function() {
        // This depends on radical width being updated, but squareRootDiagonal gets updated first,
        // so explicitly call the update.
        this.parent.radical.updateWidth();
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.left = this.parent.radical.width + (this.adjustLeft + this.parent.padLeft) * fontHeight;
    };
    eqEd.SquareRootDiagonal.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        //this.width = 0.58 * fontHeight;
        this.width = 0.58 * fontHeight + 0.05 * this.height;
    };
    eqEd.SquareRootDiagonal.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = this.parent.radicandContainer.height;
        if (this.parent.radicandContainer.isMaxTopAlignRootWrapper) {
            this.height += (this.parent.radicandContainer.padTopMaxChildAlignTopIsRoot + this.parent.radicandContainer.padBottomMaxChildAlignTopIsRoot) * fontHeight;
        } else {
            this.height += (this.parent.radicandContainer.padTopMaxChildAlignTopIsNotRoot + this.parent.radicandContainer.padBottomMaxChildAlignTopIsNotRoot) * fontHeight;
        }
    };
    eqEd.SquareRootDiagonal.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="squareRootDiagonal" style="width: 130.0331px; height: 256.45282px;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 130.0331 256.45282" preserveAspectRatio="none"><g transform="translate(-391.39675,-547.35338)"><g transform="scale(1.1433177,0.87464752)" style="font-size:162.99891663px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;font-family:cmex10;-inkscape-font-specification:cmex10" id="text2989"><path d="m 342.3342,915.58351 0,-0.95508 c 0.053,-0.1064 0.0796,-0.21252 0.0796,-0.31835 0.053,-0.1064 0.0796,-0.21252 0.0796,-0.31836 L 448.42675,628.42526 c 0.42437,-1.37954 1.51208,-2.25503 3.26317,-2.62645 l 0.95507,0 c 1.75084,0.31836 2.89162,1.45914 3.42234,3.42234 l 0,0.95507 c -1.2e-4,0.10612 -0.0267,0.23877 -0.0796,0.39795 -1.2e-4,0.10612 -0.0266,0.21224 -0.0796,0.31836 L 349.97477,916.45899 c -0.42449,1.3262 -1.51221,2.17515 -3.26316,2.54686 l -0.95507,0 c -1.75098,-0.31865 -2.89176,-1.45943 -3.42234,-3.42234" style="" id="path2987" /></g></g></svg></div>';
        } else {
            img = '<div class="squareRootDiagonal"><img class="nonHighlightVersion" src="Images/radicalDiagonalLine.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/radicalDiagonalLineHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End SquareRootDiagonal Class ///////

/////// Begin SquareRootRadicandContainer Class ///////

eqEd.SquareRootRadicandContainer = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Container.call(this, symbolSizeConfig);

    this.parent = null;
    this.squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(symbolSizeConfig);
    this.addWrappers([0, this.squareEmptyContainerWrapper]);
    this.adjustLeft = 0;
    this.adjustTop = 0;
    this.padTopMaxChildAlignTopIsRoot = 0.45;
    this.padTopMaxChildAlignTopIsNotRoot = 0.15;
    this.padBottomMaxChildAlignTopIsRoot = 0.2;
    this.padBottomMaxChildAlignTopIsNotRoot = 0;
    this.isMaxTopAlignRootWrapper = false;
}

eqEd.SquareRootRadicandContainer.prototype = new eqEd.Container(eqEd.noConstructorCall);

(function() {
    eqEd.SquareRootRadicandContainer.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.left = this.parent.radical.width + this.parent.squareRootDiagonal.width + (this.parent.padLeft + this.adjustLeft) * fontHeight;
    }
    eqEd.SquareRootRadicandContainer.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.top = (this.parent.padTop + this.adjustTop) * fontHeight;
        if (this.isMaxTopAlignRootWrapper) {
            this.top += this.padTopMaxChildAlignTopIsRoot * fontHeight;
        } else {
            this.top += this.padTopMaxChildAlignTopIsNotRoot * fontHeight;
        }
    }
    eqEd.SquareRootRadicandContainer.prototype.updateFontSize = function() {
        this.fontSize = this.parent.parent.fontSize;
    }
    eqEd.SquareRootRadicandContainer.prototype.buildHtmlRepresentation = function() {
        return '<div class="container squareRootRadicandContainer"></div>';
    }
    eqEd.SquareRootRadicandContainer.prototype.computeIsMaxTopAlignRootWrapper = function() {
        var maxTopAlignWrapperInSquareRootRadicandContainer = _.map(this.wrappers, function(x) {
            return x.topAlign;
        }).getMaxIndex();
        if (this.wrappers[maxTopAlignWrapperInSquareRootRadicandContainer].jQueryObject.hasClass('squareRootWrapper')
         || this.wrappers[maxTopAlignWrapperInSquareRootRadicandContainer].jQueryObject.hasClass('nthRootWrapper')) {
            this.isMaxTopAlignRootWrapper = true;
        } else {
            this.isMaxTopAlignRootWrapper = false;
        }
    }
    eqEd.SquareRootRadicandContainer.prototype.updateFormatting = function() {
        eqEd.Container.prototype.updateFormatting.apply(this);
        this.computeIsMaxTopAlignRootWrapper();
    }
})();   
/////// End SquareRootRadicandContainer Class ///////

/////// Begin NthRootWrapper Class ///////

eqEd.NthRootWrapper = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Wrapper.call(this, symbolSizeConfig);
    this.radicandContainer = new eqEd.NthRootRadicandContainer(symbolSizeConfig);
    this.nthRootOverBar = new eqEd.NthRootOverBar(symbolSizeConfig);
    this.radical = new eqEd.NthRootRadical(symbolSizeConfig);
    this.nthRootDiagonal = new eqEd.NthRootDiagonal(symbolSizeConfig);
    this.nthRootDegreeContainer = new eqEd.NthRootDegreeContainer(symbolSizeConfig);
    this.jQueryObject.append(this.radicandContainer.jQueryObject);
    this.jQueryObject.append(this.nthRootOverBar.jQueryObject);
    this.jQueryObject.append(this.radical.jQueryObject);
    this.jQueryObject.append(this.nthRootDiagonal.jQueryObject);
    this.jQueryObject.append(this.nthRootDegreeContainer.jQueryObject);
    this.radicandContainer.parent = this;
    this.nthRootOverBar.parent = this;
    this.radical.parent = this;
    this.nthRootDiagonal.parent = this;
    this.nthRootDegreeContainer.parent = this;
    this.childContainers = [this.radicandContainer, this.nthRootDegreeContainer];
    this.childNoncontainers = [this.nthRootDiagonal, this.radical, this.nthRootOverBar];

    this.padBottomWhenParentIsFraction = 0.2;
    this.padLeft = 0.1;
    this.padTop = 0;
    this.padRight = 0.1;
    //this.padBottom = 0;
}

eqEd.NthRootWrapper.prototype = new eqEd.Wrapper(eqEd.noConstructorCall);
(function() {
    eqEd.NthRootWrapper.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        var width = this.radical.width + this.nthRootDiagonal.width + this.radicandContainer.width + (this.padLeft + this.padRight)*fontHeight;
        if (this.nthRootDegreeContainer.isLeftFlushToWrapper) {
            this.width = width + this.nthRootDegreeContainer.width - this.nthRootDegreeContainer.offsetRadicalRight * fontHeight + this.nthRootDegreeContainer.diagonalHeightAdjustment * this.nthRootDiagonal.height - this.radical.width;
        } else {
            this.width = width;
        }
    }
    eqEd.NthRootWrapper.prototype.updateTopAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        var topAlign = this.radicandContainer.topAlign + this.padTop * fontHeight;
        if (this.radicandContainer.isMaxTopAlignRootWrapper) {
            topAlign += this.radicandContainer.padTopMaxChildAlignTopIsRoot * fontHeight;
        } else {
            topAlign += this.radicandContainer.padTopMaxChildAlignTopIsNotRoot * fontHeight;
        }
        if (this.nthRootDegreeContainer.isTopFlushToWrapper) {
            topAlign += this.nthRootDegreeContainer.height + this.radical.height + this.nthRootDegreeContainer.offsetRadicalBottom * fontHeight - this.nthRootDiagonal.height;
        }
        this.topAlign = topAlign;
    }
    eqEd.NthRootWrapper.prototype.updateBottomAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.bottomAlign = this.radicandContainer.bottomAlign + this.padBottom * fontHeight;
        if (this.radicandContainer.isMaxTopAlignRootWrapper) {
            this.bottomAlign += this.radicandContainer.padBottomMaxChildAlignTopIsRoot * fontHeight;
        } else {
            this.bottomAlign += this.radicandContainer.padBottomMaxChildAlignTopIsNotRoot * fontHeight;
        }
        if (this.parent.jQueryObject.hasClass('stackedFractionNumeratorContainer')) {
            this.bottomAlign += this.padBottomWhenParentIsFraction * fontHeight;
        }
    }
    eqEd.NthRootWrapper.prototype.buildHtmlRepresentation = function() {
        return '<div class="wrapper nthRootWrapper"></div>';
    }
})();

/////// End NthRootWrapper Class ///////

/////// Begin NthRootOverBar Class ///////

eqEd.NthRootOverBar = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.EquationObject.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = -0.06;
    this.adjustTop = 0;
    this.heightRatio = 0.055;
}

eqEd.NthRootOverBar.prototype = new eqEd.EquationObject(eqEd.noConstructorCall);
(function() {
    eqEd.NthRootOverBar.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var top = (this.adjustTop + this.parent.padTop) * fontHeight;
        if (this.parent.nthRootDegreeContainer.isTopFlushToWrapper) {
            this.top = top + this.parent.nthRootDegreeContainer.height + this.parent.radical.height + this.parent.nthRootDegreeContainer.offsetRadicalBottom * fontHeight - this.parent.nthRootDiagonal.height;
        } else {
            this.top = top;
        }
    }
    eqEd.NthRootOverBar.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var left = this.parent.radical.width + this.parent.nthRootDiagonal.width + (this.adjustLeft + this.parent.padLeft) * fontHeight;
        if (this.parent.nthRootDegreeContainer.isLeftFlushToWrapper) {
            this.left = left + this.parent.nthRootDegreeContainer.width - this.parent.nthRootDegreeContainer.offsetRadicalRight * fontHeight + this.parent.nthRootDegreeContainer.diagonalHeightAdjustment * this.parent.nthRootDiagonal.height - this.parent.radical.width;
        } else {
            this.left = left;
        }
    }
    eqEd.NthRootOverBar.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.width = this.parent.radicandContainer.width - this.adjustLeft * fontHeight;
    }
    eqEd.NthRootOverBar.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = this.heightRatio * fontHeight;
    }
    eqEd.NthRootOverBar.prototype.buildHtmlRepresentation = function() {
        return '<div class="nthRootOverBar"></div>';
    }
})();

/////// End NthRootOverBar Class ///////

/////// Begin NthRootRadical Class ///////

eqEd.NthRootRadical = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.EquationObject.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0.01;
}

eqEd.NthRootRadical.prototype = new eqEd.EquationObject(eqEd.noConstructorCall);
(function() {
    eqEd.NthRootRadical.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var top = this.parent.nthRootDiagonal.height - this.height + (this.adjustTop + this.parent.padTop) * fontHeight;
        if (this.parent.nthRootDegreeContainer.isTopFlushToWrapper) {
            this.top = top + this.parent.nthRootDegreeContainer.height + this.parent.radical.height + this.parent.nthRootDegreeContainer.offsetRadicalBottom * fontHeight - this.parent.nthRootDiagonal.height;
        } else {
            this.top = top;
        }
    };
    eqEd.NthRootRadical.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var left = (this.adjustLeft + this.parent.padLeft) * fontHeight;
        if (this.parent.nthRootDegreeContainer.isLeftFlushToWrapper) {
            this.left = left + this.parent.nthRootDegreeContainer.width - this.parent.nthRootDegreeContainer.offsetRadicalRight * fontHeight + this.parent.nthRootDegreeContainer.diagonalHeightAdjustment * this.parent.nthRootDiagonal.height - this.parent.radical.width;
        } else {
            this.left = left;
        }
    };
    eqEd.NthRootRadical.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        if (this.parent.nthRootDiagonal.height < 2 * fontHeight) {
            //this.width = 0.36 * fontHeight;
            this.width = 0.4 * fontHeight;
        } else {
            this.width = 0.5 * fontHeight;
        }
    };
    eqEd.NthRootRadical.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        if (this.parent.nthRootDiagonal.height < 2 * fontHeight) {
            //this.height = 0.61 * fontHeight;
            this.height = 0.7 * fontHeight;
        } else {
            this.height = 0.75 * fontHeight;
        }
    };
    eqEd.NthRootRadical.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="nthRootRadical" style="width: 74.842293px; height: 127.48769px;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 74.842293 127.48769" preserveAspectRatio="none"><defs id="defs4"><clipPath clipPathUnits="userSpaceOnUse" id="clipPath3765"><rect style="fill:#b1ded2;fill-opacity:1;stroke:none" id="rect3767" width="74.842293" height="127.62585" x="198.84776" y="668.99451" /></clipPath></defs><g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(-198.84776,-668.99451)"><g clip-path="url(#clipPath3765)"><path d="m 265.30006,796.48219 -47.75994,-111.23309 -14.88621,11.47479 -3.82493,-3.82493 30.28931,-23.46646 44.65864,103.89336 109.8892,-228.9789 c 0.68896,-1.30943 1.89502,-1.96414 3.61817,-1.96415 1.17139,1e-5 2.17069,0.41351 2.99792,1.24052 0.8268,0.82701 1.2403,1.82632 1.24052,2.99791 -2.2e-4,0.68918 -0.0691,1.17161 -0.20676,1.44728 L 273.15667,794.51804 c -0.55144,1.30919 -1.61966,1.96391 -3.20467,1.96415 l -4.65194,0" style="" id="path2987" /></g></g></svg></div>';
        } else {
            img = '<div class="nthRootRadical"><img class="nonHighlightVersion" src="Images/radical.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/radicalHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End NthRootRadical Class ///////

/////// Begin NthRootDiagonal Class ///////

eqEd.NthRootDiagonal = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.EquationObject.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = -0.035;
    this.adjustTop = 0;
}

eqEd.NthRootDiagonal.prototype = new eqEd.EquationObject(eqEd.noConstructorCall);
(function() {
    eqEd.NthRootDiagonal.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.parent.radical.updateHeight();
        var top = (this.parent.padTop + this.adjustTop) * fontHeight;
        if (this.parent.nthRootDegreeContainer.isTopFlushToWrapper) {
            this.top = top + this.parent.nthRootDegreeContainer.height + this.parent.radical.height + this.parent.nthRootDegreeContainer.offsetRadicalBottom * fontHeight - this.height;
        } else {
            this.top = top;
        }
    };
    eqEd.NthRootDiagonal.prototype.updateLeft = function() {
        // This depends on radical width being updated, but nthRootDiagonal gets updated first,
        // so explicitly call the update.
        this.parent.radical.updateWidth();
        this.parent.nthRootDegreeContainer.updateLeft();
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var left = this.parent.radical.width + (this.adjustLeft + this.parent.padLeft) * fontHeight;
        if (this.parent.nthRootDegreeContainer.isLeftFlushToWrapper) {
            this.left = left + this.parent.nthRootDegreeContainer.width - this.parent.nthRootDegreeContainer.offsetRadicalRight * fontHeight + this.parent.nthRootDegreeContainer.diagonalHeightAdjustment * this.parent.nthRootDiagonal.height - this.parent.radical.width;
        } else {
            this.left = left;
        }
    };
    eqEd.NthRootDiagonal.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        //this.width = 0.58 * fontHeight;
        this.width = 0.58 * fontHeight + 0.05 * this.height;
    };
    eqEd.NthRootDiagonal.prototype.updateHeight = function() {
        // This is the first thing called while formatting the nthRootWrapper, and this method call
        // updates some important properties on the nthRootDegreeContainer.
        this.parent.nthRootDegreeContainer.IsDegreeContainerFlush();

        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = this.parent.radicandContainer.height;
        if (this.parent.radicandContainer.isMaxTopAlignRootWrapper) {
            this.height += (this.parent.radicandContainer.padTopMaxChildAlignTopIsRoot + this.parent.radicandContainer.padBottomMaxChildAlignTopIsRoot) * fontHeight;
        } else {
            this.height += (this.parent.radicandContainer.padTopMaxChildAlignTopIsNotRoot + this.parent.radicandContainer.padBottomMaxChildAlignTopIsNotRoot) * fontHeight;
        }
    };
    eqEd.NthRootDiagonal.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="nthRootDiagonal" style="width: 130.0331px; height: 256.45282px;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 130.0331 256.45282" preserveAspectRatio="none"><g transform="translate(-391.39675,-547.35338)"><g transform="scale(1.1433177,0.87464752)" style="font-size:162.99891663px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;font-family:cmex10;-inkscape-font-specification:cmex10" id="text2989"><path d="m 342.3342,915.58351 0,-0.95508 c 0.053,-0.1064 0.0796,-0.21252 0.0796,-0.31835 0.053,-0.1064 0.0796,-0.21252 0.0796,-0.31836 L 448.42675,628.42526 c 0.42437,-1.37954 1.51208,-2.25503 3.26317,-2.62645 l 0.95507,0 c 1.75084,0.31836 2.89162,1.45914 3.42234,3.42234 l 0,0.95507 c -1.2e-4,0.10612 -0.0267,0.23877 -0.0796,0.39795 -1.2e-4,0.10612 -0.0266,0.21224 -0.0796,0.31836 L 349.97477,916.45899 c -0.42449,1.3262 -1.51221,2.17515 -3.26316,2.54686 l -0.95507,0 c -1.75098,-0.31865 -2.89176,-1.45943 -3.42234,-3.42234" style="" id="path2987" /></g></g></svg></div>';
        } else {
            img = '<div class="nthRootDiagonal"><img class="nonHighlightVersion" src="Images/radicalDiagonalLine.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/radicalDiagonalLineHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End NthRootDiagonal Class ///////

/////// Begin NthRootRadicandContainer Class ///////

eqEd.NthRootRadicandContainer = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Container.call(this, symbolSizeConfig);

    this.parent = null;
    this.squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(symbolSizeConfig);
    this.addWrappers([0, this.squareEmptyContainerWrapper]);
    this.adjustLeft = 0;
    this.adjustTop = 0;
    this.padTopMaxChildAlignTopIsRoot = 0.45;
    this.padTopMaxChildAlignTopIsNotRoot = 0.15;
    this.padBottomMaxChildAlignTopIsRoot = 0.2;
    this.padBottomMaxChildAlignTopIsNotRoot = 0;
    this.isMaxTopAlignRootWrapper = false;
}

eqEd.NthRootRadicandContainer.prototype = new eqEd.Container(eqEd.noConstructorCall);

(function() {
    eqEd.NthRootRadicandContainer.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var left = this.parent.radical.width + this.parent.nthRootDiagonal.width + (this.parent.padLeft + this.adjustLeft) * fontHeight;
        if (this.parent.nthRootDegreeContainer.isLeftFlushToWrapper) {
            this.left = left + this.parent.nthRootDegreeContainer.width - this.parent.nthRootDegreeContainer.offsetRadicalRight * fontHeight + this.parent.nthRootDegreeContainer.diagonalHeightAdjustment * this.parent.nthRootDiagonal.height - this.parent.radical.width;
        } else {
            this.left = left;
        }
    }
    eqEd.NthRootRadicandContainer.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var top = (this.parent.padTop + this.adjustTop) * fontHeight;
        if (this.isMaxTopAlignRootWrapper) {
            top += this.padTopMaxChildAlignTopIsRoot * fontHeight;
        } else {
            top += this.padTopMaxChildAlignTopIsNotRoot * fontHeight;
        }
        if (this.parent.nthRootDegreeContainer.isTopFlushToWrapper) {
            this.top = top + this.parent.nthRootDegreeContainer.height + this.parent.radical.height + this.parent.nthRootDegreeContainer.offsetRadicalBottom * fontHeight - this.parent.nthRootDiagonal.height;
        } else {
            this.top = top;
        }
    }
    eqEd.NthRootRadicandContainer.prototype.updateFontSize = function() {
        this.fontSize = this.parent.parent.fontSize;
    }
    eqEd.NthRootRadicandContainer.prototype.buildHtmlRepresentation = function() {
        return '<div class="container nthRootRadicandContainer"></div>';
    }
    eqEd.NthRootRadicandContainer.prototype.computeIsMaxTopAlignRootWrapper = function() {
        var maxTopAlignWrapperInNthRootRadicandContainer = _.map(this.wrappers, function(x) {
            return x.topAlign;
        }).getMaxIndex();
        if (this.wrappers[maxTopAlignWrapperInNthRootRadicandContainer].jQueryObject.hasClass('squareRootWrapper')
         || this.wrappers[maxTopAlignWrapperInNthRootRadicandContainer].jQueryObject.hasClass('nthRootWrapper')) {
            this.isMaxTopAlignRootWrapper = true;
        } else {
            this.isMaxTopAlignRootWrapper = false;
        }
    }
    eqEd.NthRootRadicandContainer.prototype.updateFormatting = function() {
        eqEd.Container.prototype.updateFormatting.apply(this);
        this.computeIsMaxTopAlignRootWrapper();
    }
})();   
/////// End NthRootRadicandContainer Class ///////

/////// Begin NthRootDegreeContainer Class ///////

eqEd.NthRootDegreeContainer = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Container.call(this, symbolSizeConfig);

    this.parent = null;
    this.squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(symbolSizeConfig);
    this.addWrappers([0, this.squareEmptyContainerWrapper]);
    this.adjustLeft = 0;
    this.adjustTop = 0;
    this.offsetRadicalBottom = -0.1;
    this.offsetRadicalRight = 0.3;
    this.diagonalHeightAdjustment = 0.05;
    this.isLeftFlushToWrapper = false;
    this.isTopFlushToWrapper = false;
}

eqEd.NthRootDegreeContainer.prototype = new eqEd.Container(eqEd.noConstructorCall);

(function() {
    eqEd.NthRootDegreeContainer.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.parent.radical.updateWidth();

        if (this.isLeftFlushToWrapper) {
            this.left = (this.adjustLeft + this.parent.padLeft) * fontHeight;
        } else {
            this.left = this.parent.radical.width - (this.width - this.offsetRadicalRight * fontHeight + this.diagonalHeightAdjustment * this.parent.nthRootDiagonal.height) + (this.adjustLeft + this.parent.padLeft) * fontHeight;
        }
    }
    eqEd.NthRootDegreeContainer.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        if (!this.isTopFlushToWrapper) {
            this.top = this.parent.nthRootDiagonal.height - this.parent.radical.height - this.offsetRadicalBottom * fontHeight - this.height + (this.adjustTop + this.parent.padTop) * fontHeight;
        } else {
            this.top = (this.adjustTop + this.parent.padTop) * fontHeight;
        }
    }
    eqEd.NthRootDegreeContainer.prototype.updateFontSize = function() {
        this.fontSize = "fontSizeSmallest";
    }
    eqEd.NthRootDegreeContainer.prototype.buildHtmlRepresentation = function() {
        return '<div class="container nthRootDegreeContainer"></div>';
    }
    eqEd.NthRootDegreeContainer.prototype.IsDegreeContainerFlush = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.parent.radical.updateHeight();
        this.parent.radical.updateWidth();

        var diagonalHeight = this.parent.radicandContainer.height;
        if (this.parent.radicandContainer.isMaxTopAlignRootWrapper) {
            diagonalHeight += (this.parent.radicandContainer.padTopMaxChildAlignTopIsRoot + this.parent.radicandContainer.padBottomMaxChildAlignTopIsRoot) * fontHeight;
        } else {
            diagonalHeight += (this.parent.radicandContainer.padTopMaxChildAlignTopIsNotRoot + this.parent.radicandContainer.padBottomMaxChildAlignTopIsNotRoot) * fontHeight;
        }

        if (diagonalHeight - (this.parent.radical.height + this.offsetRadicalBottom * fontHeight) < this.height) {
            this.isTopFlushToWrapper = true;
        } else {
            this.isTopFlushToWrapper = false;
        }

        if (this.width - this.offsetRadicalRight * fontHeight + this.diagonalHeightAdjustment * diagonalHeight < this.parent.radical.width) {
            this.isLeftFlushToWrapper = false;
        } else {
            this.isLeftFlushToWrapper = true;
        }
    }
})();   
/////// End NthRootRadicandContainer Class ///////

/////// Begin OperatorWrapper Class ///////
eqEd.OperatorWrapper = function(symbolSizeConfig, operatorSymbol) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Wrapper.call(this, symbolSizeConfig);

    this.operatorList = {"addition": eqEd.AdditionOperator, "subtraction": eqEd.SubtractionOperator, "dotProduct": eqEd.DotProductOperator, "equal": eqEd.EqualOperator, 'lessThan': eqEd.LessThanOperator, 'greaterThan': eqEd.GreaterThanOperator, 'lessThanOrEqualTo': eqEd.LessThanOrEqualToOperator, 'greaterThanOrEqualTo': eqEd.GreaterThanOrEqualToOperator, 'division': eqEd.DivisionOperator};
    this.operator = new this.operatorList[operatorSymbol](symbolSizeConfig);
    this.jQueryObject.append(this.operator.jQueryObject);
    this.operator.parent = this;
    this.childNoncontainers = [this.operator];

    this.padLeft = 0.05;//0.1;
    this.padTop = 0.0;//0.15;
    this.padRight = 0.075;//0.1;
    this.padBottom = 0.05;//-0.10;
}

eqEd.OperatorWrapper.prototype = new eqEd.Wrapper(eqEd.noConstructorCall);
(function() {
    eqEd.OperatorWrapper.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.width = this.operator.width + (this.padLeft + this.padRight)*fontHeight;
    }
    eqEd.OperatorWrapper.prototype.updateTopAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.topAlign = fontHeight * 0.5 + this.padTop * fontHeight;
    }
    eqEd.OperatorWrapper.prototype.updateBottomAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.bottomAlign = fontHeight * 0.5 + this.padBottom * fontHeight;
    }
    eqEd.OperatorWrapper.prototype.buildHtmlRepresentation = function() {
        return '<div class="wrapper operatorWrapper"></div>';
    }
})();
/////// End OperatorWrapper Class ///////

/////// Begin Operator Class ///////

eqEd.Operator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.EquationObject.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.Operator.prototype = new eqEd.EquationObject(eqEd.noConstructorCall);
(function() {
    eqEd.Operator.prototype.updateTop = function() {
        //var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.top = 0;
    }
    eqEd.Operator.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.left = (this.parent.padLeft + this.adjustLeft) * fontHeight;
    }
    eqEd.Operator.prototype.updateWidth = function() {}
    eqEd.Operator.prototype.updateHeight = function() {}
    eqEd.Operator.prototype.buildHtmlRepresentation = function() {}
})();

/////// End Operator Class ///////

/////// Begin AdditionOperator Class ///////

eqEd.AdditionOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.AdditionOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.AdditionOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var characterWidth = this.symbolSizeConfig.width["+"][this.parent.parent.fontSize];
        this.width = characterWidth;
    };
    eqEd.AdditionOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = fontHeight;
    };
    /*
    eqEd.AdditionOperator.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="operator additionOperator" style="width: 261.55865px; height: 261.95001;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 261.55865 261.95001" preserveAspectRatio="none"><g transform="translate(-171.03201,-334.38819)"><g><path style="fill:#000000;fill-opacity:1;stroke:none" d="m 177.17753,457.41492 249.26896,0 c 3.40462,0 6.14552,3.51225 6.14552,7.875 l 0,0 c 0,4.36275 -2.7409,7.875 -6.14552,7.875 l -249.26896,0 c -3.40462,0 -6.14552,-3.51225 -6.14552,-7.875 l 0,0 c 0,-4.36275 2.7409,-7.875 6.14552,-7.875 z" id="rect2986" /><path style="fill:#000000;fill-opacity:1;stroke:none" d="m 302.05792,334.38815 c 4.36275,0 7.875,3.32638 7.875,7.45826 l 0,247.0335 c 0,4.13187 -3.51225,7.45826 -7.875,7.45826 -4.36275,0 -7.875,-3.32639 -7.875,-7.45826 l 0,-247.0335 c 0,-4.13188 3.51225,-7.45826 7.875,-7.45826 z" id="rect3006" /></g></g></svg></div>';
        } else {
            img = '<div class="operator additionOperator"><img class="nonHighlightVersion" src="Images/additionOperator.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/additionOperatorHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
    */
    eqEd.AdditionOperator.prototype.buildHtmlRepresentation = function() {
        return '<div class="operator additionOperator fontNormal">+</div>';
        //return '<div class="symbolWrapper fontNormal"><div class="symbol">+</div></div>';
    }
})();

/////// End AdditionOperator Class ///////

/////// Begin SubtractionOperator Class ///////

eqEd.SubtractionOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.SubtractionOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.SubtractionOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var characterWidth = this.symbolSizeConfig.width["&#x2212;"][this.parent.parent.fontSize];
        this.width = characterWidth;
    };
    eqEd.SubtractionOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = fontHeight;
    };
    eqEd.SubtractionOperator.prototype.buildHtmlRepresentation = function() {
        return '<div class="operator subtractionOperator fontNormal">&#x2212;</div>';
    }
})();

/////// End SubtractionOperator Class ///////

/////// Begin EqualOperator Class ///////

eqEd.EqualOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.EqualOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.EqualOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var characterWidth = this.symbolSizeConfig.width["="][this.parent.parent.fontSize];
        this.width = characterWidth;
    };
    eqEd.EqualOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = fontHeight;
    };
    eqEd.EqualOperator.prototype.buildHtmlRepresentation = function() {
        return '<div class="operator equalOperator fontNormal">=</div>';
    }
})();

/////// End EqualOperator Class ///////

/////// Begin LessThanOrEqualToOperator Class ///////

eqEd.LessThanOrEqualToOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.LessThanOrEqualToOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.LessThanOrEqualToOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var characterWidth = this.symbolSizeConfig.width["&#x2264;"][this.parent.parent.fontSize];
        this.width = characterWidth;
    };
    eqEd.LessThanOrEqualToOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = fontHeight;
    };
    eqEd.LessThanOrEqualToOperator.prototype.buildHtmlRepresentation = function() {
        return '<div class="operator lessThanOrEqualToOperator fontNormal">&#x2264;</div>';
    }
})();

/////// End LessThanOrEqualToOperator Class ///////

/////// Begin LessThanOperator Class ///////

eqEd.LessThanOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.LessThanOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.LessThanOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var characterWidth = this.symbolSizeConfig.width["&#60;"][this.parent.parent.fontSize];
        this.width = characterWidth;
    };
    eqEd.LessThanOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = fontHeight;
    };
    eqEd.LessThanOperator.prototype.buildHtmlRepresentation = function() {
        return '<div class="operator lessThanOperator fontNormal">&#60;</div>';
    }
})();

/////// End LessThanOperator Class ///////

/////// Begin GreaterThanOperator Class ///////

eqEd.GreaterThanOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.GreaterThanOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.GreaterThanOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var characterWidth = this.symbolSizeConfig.width["&#62;"][this.parent.parent.fontSize];
        this.width = characterWidth;
    };
    eqEd.GreaterThanOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = fontHeight;
    };
    eqEd.GreaterThanOperator.prototype.buildHtmlRepresentation = function() {
        return '<div class="operator greaterThanOperator fontNormal">&#62;</div>';
    }
})();

/////// End GreaterThanOperator Class ///////

/////// Begin GreaterThanOrEqualToOperator Class ///////

eqEd.GreaterThanOrEqualToOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.GreaterThanOrEqualToOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.GreaterThanOrEqualToOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var characterWidth = this.symbolSizeConfig.width["&#x2265;"][this.parent.parent.fontSize];
        this.width = characterWidth;
    };
    eqEd.GreaterThanOrEqualToOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = fontHeight;
    };
    eqEd.GreaterThanOrEqualToOperator.prototype.buildHtmlRepresentation = function() {
        return '<div class="operator greaterThanOrEqualToOperator fontNormal">&#x2265;</div>';
    }
})();

/////// End GreaterThanOrEqualToOperator Class ///////

/////// Begin DotProductOperator Class ///////

eqEd.DotProductOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.DotProductOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.DotProductOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var characterWidth = this.symbolSizeConfig.width["&#x22c5;"][this.parent.parent.fontSize];
        this.width = characterWidth;
    };
    eqEd.DotProductOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = fontHeight;
    };
    eqEd.DotProductOperator.prototype.buildHtmlRepresentation = function() {
        return '<div class="operator dotProductOperator fontNormal">&#x22c5;</div>';
    }
})();

/////// End DotProductOperator Class ///////

/////// Begin DivisionOperator Class ///////

eqEd.DivisionOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.DivisionOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.DivisionOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var characterWidth = this.symbolSizeConfig.width["&#x00f7;"][this.parent.parent.fontSize];
        this.width = characterWidth;
    };
    eqEd.DivisionOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = fontHeight;
    };
    eqEd.DivisionOperator.prototype.buildHtmlRepresentation = function() {
        return '<div class="operator divisionOperator fontNormal">&#x00f7;</div>';
    }
})();

/////// End DivisionOperator Class ///////

/*

/////// Begin SubtractionOperator Class ///////

eqEd.SubtractionOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.SubtractionOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.SubtractionOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.width = 0.65 * fontHeight;
    };
    eqEd.SubtractionOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = 0.05 * fontHeight;
    };
    eqEd.SubtractionOperator.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="operator subtractionOperator" style="width: 261.55899; height: 15.75;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 261.55899 15.75" preserveAspectRatio="none"><g transform="translate(-171.03201,-457.47937)"><path style="fill:#000000;fill-opacity:1;stroke:none" d="m 178.90701,457.47937 245.80899,0 c 4.36275,0 7.875,3.51225 7.875,7.875 0,4.36275 -3.51225,7.875 -7.875,7.875 l -245.80899,0 c -4.36275,0 -7.875,-3.51225 -7.875,-7.875 0,-4.36275 3.51225,-7.875 7.875,-7.875 z" id="rect3011" /></g></svg></div>';
        } else {
            img = '<div class="operator subtractionOperator"><img class="nonHighlightVersion" src="Images/subtractionOperator.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/subtractionOperatorHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End SubtractionOperator Class ///////

/////// Begin EqualOperator Class ///////

eqEd.EqualOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.EqualOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.EqualOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.width = 0.65 * fontHeight;
    };
    eqEd.EqualOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = 0.25 * fontHeight;
    };
    eqEd.EqualOperator.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="operator equalOperator" style="width: 261.55865; height: 92.040001;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 261.55865 92.040001" preserveAspectRatio="none"><g transform="translate(-255.46058,-222.17473)"><g><path style="fill:#000000;fill-opacity:1;stroke:none" d="m 262.60344,222.17473 247.27294,0 c 3.95715,0 7.14286,3.51225 7.14286,7.875 0,4.36275 -3.18571,7.875 -7.14286,7.875 l -247.27294,0 c -3.95714,0 -7.14285,-3.51225 -7.14285,-7.875 0,-4.36275 3.18571,-7.875 7.14285,-7.875 z" id="rect2984-6" /><path style="fill:#000000;fill-opacity:1;stroke:none"d="m 262.60344,298.46472 247.27294,0 c 3.95715,0 7.14286,3.51225 7.14286,7.875 0,4.36275 -3.18571,7.875 -7.14286,7.875 l -247.27294,0 c -3.95714,0 -7.14285,-3.51225 -7.14285,-7.875 0,-4.36275 3.18571,-7.875 7.14285,-7.875 z" id="rect2984" /></g></g></svg></div>';
        } else {
            img = '<div class="operator equalOperator"><img class="nonHighlightVersion" src="Images/equalOperator.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/equalOperatorHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End EqualOperator Class ///////

/////// Begin LessThanOrEqualToOperator Class ///////

eqEd.LessThanOrEqualToOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.LessThanOrEqualToOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.LessThanOrEqualToOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.width = 0.65 * fontHeight;
    };
    eqEd.LessThanOrEqualToOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = 0.81582924372 * fontHeight;
    };
    eqEd.LessThanOrEqualToOperator.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="operator lessThanOrEqualToOperator" style="width: 261.55899; height: 328.28842;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 261.55899 328.28842" preserveAspectRatio="none"><g transform="translate(0,-724.07376)"><g style="fill:#000000"><g><path d="m 261.559,963.8005 c 0,-4.70891 -2.99659,-6.84934 -8.13359,-9.41784 L 28.681594,848.21796 253.42541,742.05326 c 5.137,-2.56849 8.13359,-4.70892 8.13359,-9.41783 0,-4.70891 -3.85276,-8.56167 -8.56167,-8.56167 -1.28425,0 -2.14042,0 -7.7055,2.99658 L 8.1335877,838.80013 C 3.4246743,840.94054 1.8920898e-6,843.08097 1.8920898e-6,848.21796 c 0,5.137 3.4246724079102,7.27743 8.1335858079102,9.41784 L 245.29183,969.36558 c 5.56508,2.99659 6.42125,2.99659 7.7055,2.99659 4.70891,0 8.56167,-3.85276 8.56167,-8.56167" style="fill:#000000" id="path3145" /></g><path style="fill:#000000;fill-opacity:1;stroke:none" d="m 7.875,1036.6122 245.80899,0 c 4.36275,0 7.875,3.5122 7.875,7.875 0,4.3627 -3.51225,7.875 -7.875,7.875 l -245.80899,0 c -4.36275,0 -7.875,-3.5123 -7.875,-7.875 0,-4.3628 3.51225,-7.875 7.875,-7.875 z" id="rect3107" /></g></g></svg></div>';
        } else {
            img = '<div class="operator lessThanOrEqualToOperator"><img class="nonHighlightVersion" src="Images/lessThanOrEqualToOperator.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/lessThanOrEqualToOperatorHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End LessThanOrEqualToOperator Class ///////

/////// Begin LessThanOperator Class ///////

eqEd.LessThanOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.LessThanOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.LessThanOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.width = 0.65 * fontHeight;
    };
    eqEd.LessThanOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = 0.61702125125 * fontHeight;
    };
    eqEd.LessThanOperator.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="operator lessThanOperator" style="width: 261.55865; height: 248.28807;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 261.55865 248.28807" preserveAspectRatio="none"><g transform="translate(-225.97599,-398.38273)"><g><path d="m 487.53464,638.10914 c 0,-4.7089 -2.99659,-6.84933 -8.13358,-9.41782 L 254.65755,522.52676 479.40106,416.36221 c 5.13699,-2.5685 8.13358,-4.70892 8.13358,-9.41783 0,-4.7089 -3.85275,-8.56165 -8.56166,-8.56165 -1.28425,0 -2.14042,0 -7.70549,2.99658 L 234.10957,513.10894 c -4.70891,2.14041 -8.13358,4.28083 -8.13358,9.41782 0,5.13699 3.42467,7.27742 8.13358,9.41783 l 237.15792,111.72963 c 5.56507,2.99658 6.42124,2.99658 7.70549,2.99658 4.70891,0 8.56166,-3.85275 8.56166,-8.56166" style="fill:#000000" /></g></g></svg></div>';
        } else {
            img = '<div class="operator lessThanOperator"><img class="nonHighlightVersion" src="Images/lessThanOperator.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/lessThanOperatorHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End LessThanOperator Class ///////

/////// Begin GreaterThanOperator Class ///////

eqEd.GreaterThanOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.GreaterThanOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.GreaterThanOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.width = 0.65 * fontHeight;
    };
    eqEd.GreaterThanOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = 0.61702125125 * fontHeight;
    };
    eqEd.GreaterThanOperator.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="operator greaterThanOperator" style="width: 261.55865; height: 248.28807;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 261.55865 248.28807" preserveAspectRatio="none"><g transform="translate(-280.2617,-166.95411)"><g><path d="m 541.82034,291.09814 c 0,-5.13698 -3.42467,-7.27741 -8.13357,-9.41782 L 296.52885,169.95069 c -5.56507,-2.99658 -6.42125,-2.99658 -7.70549,-2.99658 -4.70891,0 -8.56166,3.85275 -8.56166,8.56166 0,3.85274 2.14042,6.42124 8.13357,9.41782 L 513.13879,291.09814 288.39527,397.2627 c -5.99315,2.99658 -8.13357,5.56508 -8.13357,9.41782 0,4.70891 3.85275,8.56166 8.56166,8.56166 1.28424,0 2.14042,0 7.70549,-2.99658 L 533.68677,300.51597 c 4.7089,-2.14041 8.13357,-4.28084 8.13357,-9.41783" style="fill:#000000" /></g></g></svg></div>';
        } else {
            img = '<div class="operator greaterThanOperator"><img class="nonHighlightVersion" src="Images/greaterThanOperator.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/greaterThanOperatorHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End LessThanOperator Class ///////

/////// Begin GreaterThanOrEqualToOperator Class ///////

eqEd.GreaterThanOrEqualToOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.GreaterThanOrEqualToOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.GreaterThanOrEqualToOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.width = 0.65 * fontHeight;
    };
    eqEd.GreaterThanOrEqualToOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = 0.81582924372 * fontHeight;
    };
    eqEd.GreaterThanOrEqualToOperator.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="operator greaterThanOrEqualToOperator" style="width: 261.55899; height: 328.28842;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 261.55899 328.28842" preserveAspectRatio="none"><g transform="translate(0,-724.07376)"><g><g><path d="m 261.559,848.21796 c 0,-5.13699 -3.42467,-7.27742 -8.13359,-9.41783 L 16.267174,727.07034 c -5.56508,-2.99658 -6.4212537,-2.99658 -7.7055028,-2.99658 -4.7089134,0 -8.5616693079102,3.85276 -8.5616693079102,8.56167 0,3.85275 2.1404233079102,6.42125 8.1335858079102,9.41783 L 232.87741,848.21796 8.1335877,954.38266 C 2.1404252,957.37924 1.8920898e-6,959.94775 1.8920898e-6,963.8005 c 0,4.70891 3.8527559079102,8.56167 8.5616693079102,8.56167 1.2842491,0 2.1404228,0 7.7055028,-2.99659 L 253.42541,857.6358 c 4.70892,-2.14041 8.13359,-4.28084 8.13359,-9.41784" style="fill:#000000" /></g><path style="fill:#000000;fill-opacity:1;stroke:none" d="m 7.875,1036.6122 245.80899,0 c 4.36275,0 7.875,3.5122 7.875,7.875 0,4.3627 -3.51225,7.875 -7.875,7.875 l -245.80899,0 c -4.36275,0 -7.875,-3.5123 -7.875,-7.875 0,-4.3628 3.51225,-7.875 7.875,-7.875 z" /></g></g></svg></div>';
        } else {
            img = '<div class="operator greaterThanOrEqualToOperator"><img class="nonHighlightVersion" src="Images/greaterThanOrEqualToOperator.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/greaterThanOrEqualToOperatorHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End GreaterThanOrEqualToOperator Class ///////

/////// Begin DotProductOperator Class ///////

eqEd.DotProductOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.DotProductOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.DotProductOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.width = Math.ceil(0.075 * fontHeight);
    };
    eqEd.DotProductOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = Math.ceil(0.075 * fontHeight);
    };
    eqEd.DotProductOperator.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="operator dotProductOperator" style="width: 50; height: 50;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 50 50" preserveAspectRatio="none"><g transform="translate(-147.48228,-287.17417)"><path transform="matrix(0.85340473,0,0,0.86837677,21.620205,44.379953)" style="fill:#000000;fill-opacity:1;stroke:none" d="m 206.07113,308.38483 c 0,15.89991 -13.11556,28.78934 -29.29443,28.78934 -16.17886,0 -29.29442,-12.88943 -29.29442,-28.78934 0,-15.89992 13.11556,-28.78935 29.29442,-28.78935 16.17887,0 29.29443,12.88943 29.29443,28.78935 z" id="path3160" /></g></svg></div>';
        } else {
            img = '<div class="operator dotProductOperator"><img class="nonHighlightVersion" src="Images/dotProductOperator.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/dotProductOperatorHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End DotProductOperator Class ///////

/////// Begin DivisionOperator Class ///////

eqEd.DivisionOperator = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Operator.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.DivisionOperator.prototype = new eqEd.Operator(eqEd.noConstructorCall);
(function() {
    eqEd.DivisionOperator.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.width = 0.7 * fontHeight;
    };
    eqEd.DivisionOperator.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = 0.45 * fontHeight;
    };
    eqEd.DivisionOperator.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="operator divisionOperator" style="width: 261.55899; height: 165.75002;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 261.55865 165.75002" preserveAspectRatio="none"><g transform="translate(-168.57143,-405.79075)"><g><path style="fill:#000000;fill-opacity:1;stroke:none" d="m 175.71428,480.93362 247.27294,0 c 3.95715,0 7.14286,3.51225 7.14286,7.875 0,4.36275 -3.18571,7.875 -7.14286,7.875 l -247.27294,0 c -3.95714,0 -7.14285,-3.51225 -7.14285,-7.875 0,-4.36275 3.18571,-7.875 7.14285,-7.875 z" /><path transform="matrix(1.2623656,0,0,1.2489361,15.278043,-121.26657)" style="fill:#000000;fill-opacity:1;stroke:none" d="m 241.78572,438.79074 c 0,9.2705 -7.43527,16.78572 -16.60715,16.78572 -9.17187,0 -16.60714,-7.51522 -16.60714,-16.78572 0,-9.27049 7.43527,-16.78571 16.60714,-16.78571 9.17188,0 16.60715,7.51522 16.60715,16.78571 z" /><path transform="matrix(1.2623656,0,0,1.2489361,15.385172,2.5548712)" style="fill:#000000;fill-opacity:1;stroke:none" d="m 241.78572,438.79074 c 0,9.2705 -7.43527,16.78572 -16.60715,16.78572 -9.17187,0 -16.60714,-7.51522 -16.60714,-16.78572 0,-9.27049 7.43527,-16.78571 16.60714,-16.78571 9.17188,0 16.60715,7.51522 16.60715,16.78571 z" /></g></g></svg></div>';
        } else {
            img = '<div class="operator divisionOperator"><img class="nonHighlightVersion" src="Images/divisionOperator.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/divisionOperatorHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End DivisionOperator Class ///////

*/

/////// Begin BracketWrapper Class ///////
eqEd.BracketWrapper = function(symbolSizeConfig, bracketType) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Wrapper.call(this, symbolSizeConfig);

    this.bracketList = {"leftParenthesis": eqEd.ParenthesesLeftBracket, "rightParenthesis": eqEd.ParenthesesRightBracket, "leftCurly": eqEd.CurlyLeftBracket, "rightCurly": eqEd.CurlyRightBracket, "leftSquare": eqEd.SquareLeftBracket, "rightSquare": eqEd.SquareRightBracket};
    this.bracket = new this.bracketList[bracketType](symbolSizeConfig);
    this.jQueryObject.append(this.bracket.jQueryObject);
    this.bracket.parent = this;
    this.childNoncontainers = [this.bracket];
}

eqEd.BracketWrapper.prototype = new eqEd.Wrapper(eqEd.noConstructorCall);
(function() {
    eqEd.BracketWrapper.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.width = this.bracket.width + (this.padLeft + this.padRight)*fontHeight;
    }
    eqEd.BracketWrapper.prototype.updateTopAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        // This seems hackish, fix if there is time.
        var symbolWrapper = new eqEd.SymbolWrapper(this.symbolSizeConfig, 'a')
        if (this.bracket.height < (1.01 + symbolWrapper.padBottom) * fontHeight) {
            this.topAlign = this.bracket.height * 0.5 + this.padTop * fontHeight;
        }
    }
    eqEd.BracketWrapper.prototype.updateBottomAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        // This seems hackish, fix if there is time.
        var symbolWrapper = new eqEd.SymbolWrapper(this.symbolSizeConfig, 'a')
        if (this.bracket.height < (1.01 + symbolWrapper.padBottom) * fontHeight) {
            this.bottomAlign = this.bracket.height * 0.5 + this.padBottom * fontHeight;
        }
    }
    eqEd.BracketWrapper.prototype.buildHtmlRepresentation = function() {
        return '<div class="wrapper bracketWrapper"></div>';
    }
})();
/////// End BracketWrapper Class ///////

/////// Begin LeftBracketWrapper Class ///////
eqEd.LeftBracketWrapper = function(symbolSizeConfig, bracketType) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }

    eqEd.BracketWrapper.call(this, symbolSizeConfig, bracketType);
    this.padLeft = 0.1;
    //this.padRight = 0.025;
    this.padRight = 0;
    this.jQueryObject.addClass('leftBracket');
}

eqEd.LeftBracketWrapper.prototype = new eqEd.BracketWrapper(eqEd.noConstructorCall);
/////// End LeftBracketWrapper Class ///////

/////// Begin RightBracketWrapper Class ///////
eqEd.RightBracketWrapper = function(symbolSizeConfig, bracketType) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }

    eqEd.BracketWrapper.call(this, symbolSizeConfig, bracketType);
    this.padLeft = 0.075;
    this.padRight = 0.1;
    this.jQueryObject.addClass('rightBracket');
}

eqEd.RightBracketWrapper.prototype = new eqEd.BracketWrapper(eqEd.noConstructorCall);
/////// End RightBracketWrapper Class ///////

/////// Begin Bracket Class ///////

eqEd.Bracket = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.EquationObject.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
    this.height = 0;
}

eqEd.Bracket.prototype = new eqEd.EquationObject(eqEd.noConstructorCall);
(function() {
    eqEd.Bracket.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.top = (this.parent.padTop + this.adjustTop) * fontHeight;
    }
    eqEd.Bracket.prototype.updateLeft = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.left = (this.parent.padLeft + this.adjustLeft) * fontHeight;
    }
    eqEd.Bracket.prototype.updateWidth = function() {}
    eqEd.Bracket.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        //if (this.height < 1.125 * fontHeight) {
        //    this.height = 1.125 * fontHeight;
        //}
        var symbolWrapper = new eqEd.SymbolWrapper(this.symbolSizeConfig, 'a')
        if (this.height < (1 + symbolWrapper.padBottom) * fontHeight) {
            this.height = (1 + symbolWrapper.padBottom) * fontHeight;
        }
    }
    eqEd.Bracket.prototype.buildHtmlRepresentation = function() {}
})();

/////// End Bracket Class ///////

/////// Begin ParenthesesLeftBracket Class ///////

eqEd.ParenthesesLeftBracket = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Bracket.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.ParenthesesLeftBracket.prototype = new eqEd.Bracket(eqEd.noConstructorCall);
(function() {
    eqEd.ParenthesesLeftBracket.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        //alert(this.height + ", " + 1.01 * fontHeight);
        var symbolWrapper = new eqEd.SymbolWrapper(this.symbolSizeConfig, 'a')
        if (this.height < (1.01 + symbolWrapper.padBottom) * fontHeight) {
            this.width = 0.3 * this.height;
        } else {
            this.width = 0.18208382639 * this.height;
        }
    };
    eqEd.ParenthesesLeftBracket.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="bracket parenthesesLeftBracket" style="width: 53.661411; height: 294.70718;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 53.661411 294.70718" preserveAspectRatio="none"><g transform="translate(-278.62008,-276.48379)"><g transform="scale(-1,1)" style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:2.86740971000000000;stroke-linecap:butt;stroke-opacity:1"><path d="m -329.9925,569.75725 c -0.57019,-2.8e-4 -0.85528,-0.28538 -0.85528,-0.85527 0,-0.28538 0.0634,-0.49128 0.19006,-0.6177 8.04594,-9.50337 14.79312,-20.00427 20.24158,-31.50273 5.4484,-11.49898 9.6456,-23.43326 12.59159,-35.80288 2.94591,-12.37006 5.00491,-24.84284 6.177,-37.4184 1.17201,-12.57592 1.75803,-25.80103 1.75807,-39.67538 -4e-5,-13.93799 -0.58606,-27.21062 -1.75807,-39.81793 -1.17209,-12.60752 -3.23109,-25.07239 -6.177,-37.39465 -2.94599,-12.32238 -7.14319,-24.25666 -12.59159,-35.80287 -5.44846,-11.54627 -12.19564,-22.03925 -20.24158,-31.47898 -0.12671,-0.1267 -0.19006,-0.31676 -0.19006,-0.57018 0,-0.60186 0.28509,-0.90279 0.85528,-0.90279 l 2.80341,0 c 0.0317,0 0.23757,0.095 0.6177,0.28509 8.90121,9.28134 16.40864,19.64761 22.52231,31.09885 6.11362,11.45118 10.91267,23.46465 14.39718,36.04045 3.48442,12.57567 5.95522,25.3098 7.41241,38.20241 1.45708,12.8924 2.18565,26.33925 2.18571,40.3406 -6e-5,13.9377 -0.72863,27.34496 -2.18571,40.22181 -1.45719,12.87648 -3.93591,25.61061 -7.43617,38.2024 -3.50034,12.59136 -8.29148,24.59691 -14.37342,36.0167 -6.08199,11.41927 -13.58942,21.80138 -22.52231,31.14636 -0.38013,0.18978 -0.58603,0.28481 -0.6177,0.28509 z" /></g></g></svg></div>';
        } else {
            img = '<div class="bracket parenthesesLeftBracket"><img class="nonHighlightVersion" src="Images/parenthesesLeftBracket.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/parenthesesLeftBracketHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End ParenthesesLeftBracket Class ///////

/////// Begin ParenthesesRightBracket Class ///////

eqEd.ParenthesesRightBracket = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Bracket.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.ParenthesesRightBracket.prototype = new eqEd.Bracket(eqEd.noConstructorCall);
(function() {
    eqEd.ParenthesesRightBracket.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var symbolWrapper = new eqEd.SymbolWrapper(this.symbolSizeConfig, 'a')
        if (this.height < (1.01 + symbolWrapper.padBottom) * fontHeight) {
            //alert('yo')
            this.width = 0.3 * this.height;
        } else {
            this.width = 0.18208382639 * this.height;
        }
    };
    eqEd.ParenthesesRightBracket.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="bracket parenthesesRightBracket" style="width:  53.661411; height: 294.70718;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 53.661411 294.70718" preserveAspectRatio="none"><g transform="translate(-278.62008,-276.48379)"><g transform="translate(610.90156,0)" style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:2.86740971000000000;stroke-linecap:butt;stroke-opacity:1"><path d="m -329.9925,569.75725 c -0.57019,-2.8e-4 -0.85528,-0.28538 -0.85528,-0.85527 0,-0.28538 0.0634,-0.49128 0.19006,-0.6177 8.04594,-9.50337 14.79312,-20.00427 20.24158,-31.50273 5.4484,-11.49898 9.6456,-23.43326 12.59159,-35.80288 2.94591,-12.37006 5.00491,-24.84284 6.177,-37.4184 1.17201,-12.57592 1.75803,-25.80103 1.75807,-39.67538 -4e-5,-13.93799 -0.58606,-27.21062 -1.75807,-39.81793 -1.17209,-12.60752 -3.23109,-25.07239 -6.177,-37.39465 -2.94599,-12.32238 -7.14319,-24.25666 -12.59159,-35.80287 -5.44846,-11.54627 -12.19564,-22.03925 -20.24158,-31.47898 -0.12671,-0.1267 -0.19006,-0.31676 -0.19006,-0.57018 0,-0.60186 0.28509,-0.90279 0.85528,-0.90279 l 2.80341,0 c 0.0317,0 0.23757,0.095 0.6177,0.28509 8.90121,9.28134 16.40864,19.64761 22.52231,31.09885 6.11362,11.45118 10.91267,23.46465 14.39718,36.04045 3.48442,12.57567 5.95522,25.3098 7.41241,38.20241 1.45708,12.8924 2.18565,26.33925 2.18571,40.3406 -6e-5,13.9377 -0.72863,27.34496 -2.18571,40.22181 -1.45719,12.87648 -3.93591,25.61061 -7.43617,38.2024 -3.50034,12.59136 -8.29148,24.59691 -14.37342,36.0167 -6.08199,11.41927 -13.58942,21.80138 -22.52231,31.14636 -0.38013,0.18978 -0.58603,0.28481 -0.6177,0.28509 z" /></g></g></svg></div>';
        } else {
            img = '<div class="bracket parenthesesRightBracket"><img class="nonHighlightVersion" src="Images/parenthesesRightBracket.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/parenthesesRightBracketHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End ParenthesesRightBracket Class ///////

/////// Begin CurlyLeftBracket Class ///////

eqEd.CurlyLeftBracket = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Bracket.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.CurlyLeftBracket.prototype = new eqEd.Bracket(eqEd.noConstructorCall);
(function() {
    eqEd.CurlyLeftBracket.prototype.updateWidth = function() {
        this.width = 0.3 * this.height;
    };
    eqEd.CurlyLeftBracket.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="bracket curlyLeftBracket" style="width: 25.559999; height: 72;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 25.559999 72" preserveAspectRatio="none"><g transform="translate(-259.46971,-284.07648)"><g><path d="m 285.02971,355.28448 c 0,-0.72 -0.43201,-0.72 -1.152,-0.792 -5.688,-0.36 -8.35201,-3.60001 -9,-6.192 -0.216,-0.792 -0.216,-0.93601 -0.216,-3.456 l 0,-10.8 c 0,-2.16 0,-5.832 -0.144,-6.552 -0.936,-4.752 -5.54401,-6.624 -8.352,-7.416 8.49599,-2.448 8.496,-7.56 8.496,-9.576 l 0,-12.96 c 0,-5.184 0,-6.768 1.728,-8.568 1.29599,-1.296 2.952,-3.024 7.992,-3.312 0.36,-0.072 0.648,-0.36 0.648,-0.792 0,-0.792 -0.57601,-0.792 -1.44,-0.792 -7.2,0 -13.608,3.672 -13.752,8.856 l 0,13.176 c 0,6.76799 -1e-5,7.92 -1.872,9.936 -1.008,1.008 -2.95201,2.952 -7.488,3.24 -0.504,0 -1.008,0.072 -1.008,0.792 0,0.72 0.432,0.72 1.152,0.792 3.09599,0.216 9.216,1.728 9.216,8.928 l 0,14.256 c 0,4.17599 0,6.624 3.744,9.288 3.09599,2.15999 7.776,2.736 10.008,2.736 0.86399,0 1.44,0 1.44,-0.792" /></g></g></svg></div>';
        } else {
            img = '<div class="bracket curlyLeftBracket"><img class="nonHighlightVersion" src="Images/curlyLeftBracket.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/curlyLeftBracketHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End CurlyLeftBracket Class ///////

/////// Begin CurlyRightBracket Class ///////

eqEd.CurlyRightBracket = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Bracket.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.CurlyRightBracket.prototype = new eqEd.Bracket(eqEd.noConstructorCall);
(function() {
    eqEd.CurlyRightBracket.prototype.updateWidth = function() {
        this.width = 0.3 * this.height;
    };
    eqEd.CurlyRightBracket.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="bracket curlyRightBracket" style="width: 25.559999; height: 72;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 25.559999 72" preserveAspectRatio="none"><g transform="translate(-259.46971,-284.07648)"><g transform="matrix(-1,0,0,1,544.49942,0)"><path d="m 285.02971,355.28448 c 0,-0.72 -0.43201,-0.72 -1.152,-0.792 -5.688,-0.36 -8.35201,-3.60001 -9,-6.192 -0.216,-0.792 -0.216,-0.93601 -0.216,-3.456 l 0,-10.8 c 0,-2.16 0,-5.832 -0.144,-6.552 -0.936,-4.752 -5.54401,-6.624 -8.352,-7.416 8.49599,-2.448 8.496,-7.56 8.496,-9.576 l 0,-12.96 c 0,-5.184 0,-6.768 1.728,-8.568 1.29599,-1.296 2.952,-3.024 7.992,-3.312 0.36,-0.072 0.648,-0.36 0.648,-0.792 0,-0.792 -0.57601,-0.792 -1.44,-0.792 -7.2,0 -13.608,3.672 -13.752,8.856 l 0,13.176 c 0,6.76799 -1e-5,7.92 -1.872,9.936 -1.008,1.008 -2.95201,2.952 -7.488,3.24 -0.504,0 -1.008,0.072 -1.008,0.792 0,0.72 0.432,0.72 1.152,0.792 3.09599,0.216 9.216,1.728 9.216,8.928 l 0,14.256 c 0,4.17599 0,6.624 3.744,9.288 3.09599,2.15999 7.776,2.736 10.008,2.736 0.86399,0 1.44,0 1.44,-0.792" /></g></g></svg></div>';
        } else {
            img = '<div class="bracket curlyRightBracket"><img class="nonHighlightVersion" src="Images/curlyRightBracket.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/curlyRightBracketHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End CurlyRightBracket Class ///////

/////// Begin SquareLeftBracket Class ///////

eqEd.SquareLeftBracket = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Bracket.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.SquareLeftBracket.prototype = new eqEd.Bracket(eqEd.noConstructorCall);
(function() {
    eqEd.SquareLeftBracket.prototype.updateWidth = function() {
        this.width = 0.13700000416 * this.height;
    };
    eqEd.SquareLeftBracket.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="bracket squareLeftBracket" style="width: 9.8640003; height: 72;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 9.8640003 72" preserveAspectRatio="none"><g transform="translate(-259.46971,-284.07648)"><g><path d="m 269.33371,356.07648 0,-2.88 -6.984,0 0,-66.24 6.984,0 0,-2.88 -9.864,0 0,72 9.864,0" /></g></g></svg></div>';
        } else {
            img = '<div class="bracket squareLeftBracket"><img class="nonHighlightVersion" src="Images/squareLeftBracket.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/squareLeftBracketHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End SquareLeftBracket Class ///////

/////// Begin SquareRightBracket Class ///////

eqEd.SquareRightBracket = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Bracket.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.SquareRightBracket.prototype = new eqEd.Bracket(eqEd.noConstructorCall);
(function() {
    eqEd.SquareRightBracket.prototype.updateWidth = function() {
        this.width = 0.13700000416 * this.height;
    };
    eqEd.SquareRightBracket.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="bracket squareRightBracket" style="width: 9.8640003; height: 72;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 9.8640003 72" preserveAspectRatio="none"><g transform="translate(-259.46971,-284.07648)"><g transform="scale(-1,1)"><path d="m -259.46971,356.07648 0,-2.88 -6.984,0 0,-66.24 6.984,0 0,-2.88 -9.864,0 0,72 9.864,0" /></g></g></svg></div>';
        } else {
            img = '<div class="bracket squareRightBracket"><img class="nonHighlightVersion" src="Images/squareRightBracket.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/squareRightBracketHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End SquareRightBracket Class ///////

/////// Begin BigOperatorWrapper Class ///////

eqEd.BigOperatorWrapper = function(symbolSizeConfig, bigOperatorType) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Wrapper.call(this, symbolSizeConfig);

    this.bigOperatorTopContainer = new eqEd.BigOperatorTopContainer(symbolSizeConfig);
    this.bigOperatorBottomContainer = new eqEd.BigOperatorBottomContainer(symbolSizeConfig);

    this.bigOperatorList = {"sum": eqEd.SumBigOperatorSymbol};
    this.bigOperatorSymbol = new this.bigOperatorList[bigOperatorType](symbolSizeConfig);
    this.jQueryObject.append(this.bigOperatorTopContainer.jQueryObject);
    this.jQueryObject.append(this.bigOperatorBottomContainer.jQueryObject);
    this.jQueryObject.append(this.bigOperatorSymbol.jQueryObject);
    this.bigOperatorTopContainer.parent = this;
    this.bigOperatorBottomContainer.parent = this;
    this.bigOperatorSymbol.parent = this;
    this.childNoncontainers = [this.bigOperatorSymbol];
    this.childContainers = [this.bigOperatorTopContainer, this.bigOperatorBottomContainer];

    this.padLeft = 0.05;
    this.padTop = 0;
    this.padRight = 0.05;
    //this.padBottom = 0;
}

eqEd.BigOperatorWrapper.prototype = new eqEd.Wrapper(eqEd.noConstructorCall);
(function() {
    eqEd.BigOperatorWrapper.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.width = this.getMaxChildWidth() + (this.padLeft + this.padRight)*fontHeight;
    }
    eqEd.BigOperatorWrapper.prototype.updateTopAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.topAlign = 0.5*this.bigOperatorSymbol.height + this.bigOperatorTopContainer.height + this.padTop * fontHeight;
    }
    eqEd.BigOperatorWrapper.prototype.updateBottomAlign = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
        this.bottomAlign = 0.5*this.bigOperatorSymbol.height + this.bigOperatorBottomContainer.height + this.padBottom * fontHeight;
    }
    eqEd.BigOperatorWrapper.prototype.getMaxChildWidth = function() {
        return [this.bigOperatorTopContainer.width, this.bigOperatorBottomContainer.width, this.bigOperatorSymbol.width].max();
    }
    eqEd.BigOperatorWrapper.prototype.buildHtmlRepresentation = function() {
        return '<div class="wrapper bigOperatorWrapper"></div>';
    }
})();

/////// End BigOperatorWrapper Class ///////

/////// Begin BigOperatorTopContainer Class ///////

eqEd.BigOperatorTopContainer = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Container.call(this, symbolSizeConfig);

    this.parent = null;
    this.squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(symbolSizeConfig);
    this.addWrappers([0, this.squareEmptyContainerWrapper]);
    //this.padLeft = 0;
    //this.padRight = 0;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.BigOperatorTopContainer.prototype = new eqEd.Container(eqEd.noConstructorCall);

(function() {
    eqEd.BigOperatorTopContainer.prototype.updateLeft = function() {
        // All three of topContainer, bottomContainer, and bigOperatorSymbol widths need updated before this is called.
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var maxWidth = this.parent.getMaxChildWidth();
        this.left = 0.5 * (maxWidth - this.width) + (this.parent.padLeft + this.adjustLeft) * fontHeight;
    }
    eqEd.BigOperatorTopContainer.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.top = (this.parent.padTop + this.adjustTop) * fontHeight;
    }
    eqEd.BigOperatorTopContainer.prototype.updateFontSize = function() {
        this.fontSize = "fontSizeSmallest";
    }
    eqEd.BigOperatorTopContainer.prototype.buildHtmlRepresentation = function() {
        return '<div class="container bigOperatorTopContainer"></div>';
    }
})();   
/////// End BigOperatorTopContainer Class ///////

/////// Begin BigOperatorBottomContainer Class ///////

eqEd.BigOperatorBottomContainer = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.Container.call(this, symbolSizeConfig);

    this.parent = null;
    this.squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(symbolSizeConfig);
    this.addWrappers([0, this.squareEmptyContainerWrapper]);
    //this.padLeft = 0;
    //this.padRight = 0;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.BigOperatorBottomContainer.prototype = new eqEd.Container(eqEd.noConstructorCall);

(function() {
    eqEd.BigOperatorBottomContainer.prototype.updateLeft = function() {
        // All three of topContainer, bottomContainer, and bigOperatorSymbol widths need updated before this is called.
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var maxWidth = this.parent.getMaxChildWidth();
        this.left = 0.5 * (maxWidth - this.width) + (this.parent.padLeft + this.adjustLeft) * fontHeight;
    }
    eqEd.BigOperatorBottomContainer.prototype.updateTop = function() {
        // I'm puttin this here because it gets called everytime the container gets updated
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.top = this.parent.bigOperatorTopContainer.height + this.parent.bigOperatorSymbol.height + (this.parent.padTop + this.adjustTop) * fontHeight;
    }
    eqEd.BigOperatorBottomContainer.prototype.updateFontSize = function() {
        this.fontSize = "fontSizeSmallest";
    }
    eqEd.BigOperatorBottomContainer.prototype.buildHtmlRepresentation = function() {
        return '<div class="container bigOperatorBottomContainer"></div>';
    }
})();   
/////// End BigOperatorBottomContainer Class ///////

/////// Begin BigOperatorSymbol Class ///////

eqEd.BigOperatorSymbol = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.EquationObject.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.BigOperatorSymbol.prototype = new eqEd.EquationObject(eqEd.noConstructorCall);
(function() {
    eqEd.BigOperatorSymbol.prototype.updateTop = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.top = this.parent.bigOperatorTopContainer.height + (this.parent.padTop + this.adjustTop)*fontHeight;
    }
    eqEd.BigOperatorSymbol.prototype.updateLeft = function() {
        // All three of topContainer, bottomContainer, and bigOperatorSymbol widths need updated before this is called.
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        var maxWidth = this.parent.getMaxChildWidth();
        this.left = 0.5 * (maxWidth - this.width) + (this.parent.padLeft + this.adjustLeft) * fontHeight;
    }
    eqEd.BigOperatorSymbol.prototype.updateWidth = function() {}
    eqEd.BigOperatorSymbol.prototype.updateHeight = function() {}
    eqEd.BigOperatorSymbol.prototype.buildHtmlRepresentation = function() {}
})();

/////// End BigOperatorSymbol Class ///////

/////// Begin SumBigOperatorSymbol Class ///////

eqEd.SumBigOperatorSymbol = function(symbolSizeConfig) {
    if (arguments[0] instanceof eqEd.NoConstructorCall) { return; }
    eqEd.BigOperatorSymbol.call(this, symbolSizeConfig);

    this.parent = null;
    this.adjustLeft = 0;
    this.adjustTop = 0;
}

eqEd.SumBigOperatorSymbol.prototype = new eqEd.BigOperatorSymbol(eqEd.noConstructorCall);
(function() {
    eqEd.SumBigOperatorSymbol.prototype.updateWidth = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.width = 1.2 * 0.94287111375 * fontHeight;
    };
    eqEd.SumBigOperatorSymbol.prototype.updateHeight = function() {
        var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
        this.height = 1.2 * fontHeight;
    };
    eqEd.SumBigOperatorSymbol.prototype.buildHtmlRepresentation = function() {
        var img;
        if(Modernizr.svg) {
            img = '<div class="bigOperatorSymbol sumBigOperatorSymbol" style="width: 52.797009; height: 55.995998;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 52.797009 55.995998" preserveAspectRatio="none"><g transform="translate(-50.817524,-457.79474)"><g><path d="m 51.36436,513.79074 c -0.36456,-6e-5 -0.546839,-0.20968 -0.546836,-0.62886 -3e-6,-0.14588 0.05468,-0.27348 0.164051,-0.38279 L 71.351213,487.87071 50.981575,459.81803 c -0.10937,-0.10937 -0.164054,-0.20962 -0.164051,-0.30076 l 0,-1.23038 c -3e-6,-0.12759 0.05924,-0.24152 0.177722,-0.34177 0.118478,-0.10025 0.241516,-0.15038 0.369114,-0.15038 l 47.438016,0 4.812154,13.09672 -1.61316,0 c -0.92968,-2.55191 -2.337779,-4.57976 -4.224311,-6.08355 -1.886632,-1.5038 -4.042075,-2.59748 -6.466335,-3.28102 -2.424347,-0.68354 -4.784853,-1.10278 -7.081525,-1.25772 -2.296745,-0.15494 -5.094719,-0.23241 -8.393931,-0.2324 l -18.701789,0 18.483054,25.37318 c 0.10934,0.10934 0.164023,0.23694 0.164051,0.38279 -2.8e-5,0.14579 -0.05471,0.27339 -0.164051,0.38278 l -19.986853,24.41623 20.533689,0 c 3.244528,-6e-5 6.006047,-0.0775 8.284565,-0.23241 2.278443,-0.15499 4.620722,-0.56511 7.026841,-1.23038 2.406032,-0.66537 4.543247,-1.75904 6.411651,-3.28101 1.868304,-1.52208 3.239954,-3.55904 4.114944,-6.1109 l 1.61316,0 -4.812154,14.05369 z" /></g></g></svg></div>';
        } else {
            img = '<div class="bigOperatorSymbol sumBigOperatorSymbol"><img class="nonHighlightVersion" src="Images/sumOperator.png" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;" /><img class="highlightVersion" src="Images/sumOperatorHighlight.png" style="width: 100%; height: 100%; visibility: hidden; position: absolute; top: 0px; left: 0px;" /></div>';
        }
        return img;
    };
})();

/////// End SumBigOperatorSymbol Class ///////