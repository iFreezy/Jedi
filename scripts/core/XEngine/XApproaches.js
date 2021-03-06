/**
 * Created by cyber-PC on 15.04.2017.
 */
XApproaches = {};
XApproaches.text = {};
XApproaches.any = {};

XApproaches.attribute = function (element, approach) {
    if (approach.map === undefined || approach.map[0])
        return [XParam.equals(XFunction.asAttribute(approach.name), XFunction.inQuotes(element.getAttribute(approach.name)))];
    return [null];
};

XApproaches.any.localName = function (element, approach) {
    return [XParam.equals(XFunction.localName(), XFunction.inQuotes(element.tagName)), XParam.anyElement()]
};

XApproaches.any.position = function (element, approach) {
    if (element.parentNode === undefined)
        return;
    var index = -1;
    var children = element.parentNode.children;
    for (var i = 0; i < children.length; i++) {
        if (children[i].tagName === element.tagName) {
            index++;
            if (children[i] === element)
                break;
        }
    }
    if (index !== -1)
        return [XParam.equals(XFunction.position(), index + 1)];
    return [null];
};

XApproaches.ancestor = function (element, approach) {
  var ancestors = getAncestors(element);
  var approaches = approach.args.approaches;
  if (approaches === undefined)
      return [null];
  var best = bestExpression(ancestors, approaches);
  if (best.element === null)
      return [null];
  return [XFunction.ancestor(best.element.tagName, best.expression)];
};

XApproaches.followingSibling = function (element, approach) {
    var followingSiblings = getFollowingSibling(element);
    var approaches = approach.args.approaches;
    if (approaches === undefined)
        return [null];
    return applyApproaches(followingSiblings, approaches, 'followingSibling');
};

XApproaches.empty = function (element, approach) {
    return [XParam.empty()];
};

XApproaches.child = function (element, approach) {
    var child = element.childNodes;
    var approaches = approach.args.approaches;
    if (approaches === undefined)
        return [null];
    var best = bestExpression(child, approaches);
    if (best.element === null)
        return [null];
    return [XFunction.child(best.element.tagName, best.expression)];
};

XApproaches.indexator = function (element) {
    var index = -1;
    var children = element.parentNode.children;
    for (var i = 0; i < children.length; i++) {
        if (children[i].tagName === element.tagName) {
            index++;
            if (children[i] === element)
                break;
        }
    }
    if (index !== -1)
        return [XParam.indexator(index + 1)];
    return [null];
};

XApproaches.innerHTML = function (element, approach) {
    if (element.childElementCount > 1 || element.innerHTML === undefined || element.innerHTML === '')
        return [null];
     if (approach.args !== undefined && approach.args.strategy === 'equals')
        return [XParam.equals(XFunction.node(), XFunction.inQuotes(element.innerHTML))];
     else return [XParam.contains(XFunction.node(), XFunction.inQuotes(element.innerHTML.trim()))];
};

XApproaches.innerText = function (element, approach) {
    if (element.childElementCount > 1 || element.innerText === undefined || element.innerText === '')
        return [null];
    if (approach.args !== undefined && approach.args.strategy === 'equals')
        return [XParam.equals(XFunction.text(), XFunction.inQuotes(element.innerText))];
    else return [XParam.contains(XFunction.text(), XFunction.inQuotes(element.innerText.trim()))];
};


XApproaches.text.empty = function (element, approach) {
    return [XParam.empty()];
};

XApproaches.text.indexator = function (element, approach) {
    var index = -1;
    var children = element.parentNode.childNodes;
    for (var i = 0; i < children.length; i++) {
        if (children[i] instanceof Text) {
            index++;
            if (children[i] === element)
                break;
        }
    }
    if (index !== -1)
        return [XParam.indexator(index + 1)];
    return [null];
};

XApproaches.text.innerText = function (element, approach) {
    if (element.innerText === undefined || element.innerText === '')
        return [null];
    return [XParam.contains(XFunction.text(), XFunction.inQuotes(element.innerText.trim()))];
};
