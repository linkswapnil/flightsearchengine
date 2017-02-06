describe("SearchEngine()", function() {

    beforeEach(function () {
        var html = "<div id='tabs'> </div> <div id='search'> </div> <input id='range' type='range'> </input> " +
            "<input id='max' type='range' size='40' max='13000' min='3000' step='1000' value='13000'>";
        var testElm = document.createElement('div');
        testElm.setAttribute('id','test');
        testElm.innerHTML = html;
        document.body.appendChild(testElm);
    });

    afterEach(function () {
        //document.body.removeChild(document.getElementById('test'));
    });

    it("112",function () {
        expect(1).toBe(1);
    });
});
