class LocalController < ApplicationController
  def index
  end

  def show
    fs = Foursquare2::Client.new(:client_id => '5XO4RX3ADLYLERXE2M25HH3KJ0UKQ5OER14MNHMYIMC31CUE', :client_secret => 'ZEQ2TZA1P0OC1R1G5DQGQCQGM1EO0P4JMGH4QEPBZDTT5OCA')
    venue_id = params[:id].to_s
    @local = fs.venue(venue_id)
    @similar = fs.search_venues_by_tip(:near => 'Belo Horizonte', :query => @local.name, :categoryId => @local.categories.first.id, :limit=>'5')
    @venue_photo = fs.venue_photos(venue_id, :group => "checkin", :group => "venue", :limit => 20)

    photo = fs.venue_photos(venue_id, :group => "checkin", :group => "venue", :limit => 100)
    @gender = Hash.new
    @gender["Mulheres"] = 0
    @gender["Homens"] = 0
    photo.items.each do |count|
      if count.user.gender == "male"
        @gender["Homens"]+=1
      else
        @gender["Mulheres"]+=1
      end
    end
    
    respond_to do |f|
      f.json
      f.html
    end
  end
end
