function Action (name) {
    this.name = name;
    this.handlers = [];  // observers
    console.log("Action's constructor: " + name +" initialized.");
}

Action.prototype.subscribe = function(fn) {
    this.handlers.push(fn);
};

Action.prototype.unsubscribe = function(fn) {
    this.handlers = this.handlers.filter(
        function(item) {
            if (item !== fn)
                return item;
        }
    );
}

Action.prototype.invoke = function (args) {
    for (var i = 0; i < this.handlers.length; i++) {
        this.handlers[i](args);
    }
}