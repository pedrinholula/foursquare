class PagesController < ApplicationController
  def home
    client = Foursquare2::Client.new(:client_id => '5XO4RX3ADLYLERXE2M25HH3KJ0UKQ5OER14MNHMYIMC31CUE', :client_secret => 'ZEQ2TZA1P0OC1R1G5DQGQCQGM1EO0P4JMGH4QEPBZDTT5OCA')
    @title = "Home"
    @local = client.search_venues_by_tip(:near => 'New York', :query => 'bar', :limit => 10)
    @local_json = @local.to_json
  end
end
