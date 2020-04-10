require 'test_helper'

class Api::BuyersControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get api_buyers_show_url
    assert_response :success
  end

end
