class PagesController < ApplicationController
  def home
#    fs = Foursquare2::Client.new(:client_id => '5XO4RX3ADLYLERXE2M25HH3KJ0UKQ5OER14MNHMYIMC31CUE', :client_secret => 'ZEQ2TZA1P0OC1R1G5DQGQCQGM1EO0P4JMGH4QEPBZDTT5OCA')
    @title = "Home"
#    @local = fs.search_venues_by_tip(:near => 'New York', :query => 'bar', :limit => 5)
#    @localjson = @local.to_json
#    respond_to do |format|
#      format.html
#      format.json
#    end
  end
  
  def search
  end
  
  def show

    fs = Foursquare2::Client.new(:client_id => '5XO4RX3ADLYLERXE2M25HH3KJ0UKQ5OER14MNHMYIMC31CUE', :client_secret => 'ZEQ2TZA1P0OC1R1G5DQGQCQGM1EO0P4JMGH4QEPBZDTT5OCA')
    @local = fs.search_venues_by_tip(:near => 'Belo Horizonte', :query => "Boulevard", :limit => 4)
    respond_to do |f|
      f.json
      f.html
    end
  end
end
