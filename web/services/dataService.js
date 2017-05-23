app.service('dataService', function() {
    this.selectedColor;
    this.selectedShape;
    this.selectedSize;
    this.imageSrc;

    this.saveOrder = function (selectedColor,selectedShape,selectedSize,imageSrc) {
        this.selectedColor = selectedColor;
        this.selectedShape = selectedShape;
        this.selectedSize = selectedSize;
        this.imageSrc = imageSrc;
    };

    this.getSelectedColor = function(){
        return this.selectedColor;
    };

    this.getSelectedShape = function(){
        return this.selectedShape;
    };

    this.getSelectedSize = function(){
        return this.selectedSize;
    };

    this.getSelectedImgSrc = function(){
        return this.imageSrc;
    }
});


