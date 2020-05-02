function Stack() {
    this.data = [];
    this.push = function(item) {
        this.data.push(item);
    };
    this.pop = function() {
        this.data.pop();
    };
    this.top = function() {
        return this.data[this.data.length-1];
    };
    this.isempty = function() {
        return this.data.length == 0;
    };
}
