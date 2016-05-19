describe('ProductService', function(){
  var ProductService;
  beforeEach(inject(function(_ProductService_){
    ProductService = _ProductService_;
  }));

  it('exists', function(){
    expect(ProductService).to.be.ok;
  });
});
