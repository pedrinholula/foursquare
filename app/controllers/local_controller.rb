class LocalController < ApplicationController
  def index
  end

  def show
    fs = Foursquare2::Client.new(:client_id => '5XO4RX3ADLYLERXE2M25HH3KJ0UKQ5OER14MNHMYIMC31CUE', :client_secret => 'ZEQ2TZA1P0OC1R1G5DQGQCQGM1EO0P4JMGH4QEPBZDTT5OCA')
    venue_id = params[:id].to_s
    @local = fs.venue(venue_id)
    @similar = fs.search_venues_by_tip(:near => 'Belo Horizonte', :query => @local.name, :categoryId => @local.categories.first.id, :limit=>'5')
    respond_to do |f|
      f.json 
      f.html
    end
  end
end
