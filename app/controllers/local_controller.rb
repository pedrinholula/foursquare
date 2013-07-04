class LocalController < ApplicationController
  def index
  end

  def show
    fs = Foursquare2::Client.new(:client_id => '5XO4RX3ADLYLERXE2M25HH3KJ0UKQ5OER14MNHMYIMC31CUE', :client_secret => 'ZEQ2TZA1P0OC1R1G5DQGQCQGM1EO0P4JMGH4QEPBZDTT5OCA')
    flash[:venue_id] = params[:id]
    @local = fs.venue(params[:id])
    @similar = fs.search_venues_by_tip(:near => 'Belo Horizonte', :query => @local.name, :categoryId => @local.categories.first.id, :limit=>'5')
    @venue_photo = fs.venue_photos(params[:id], :group => "checkin", :group => "venue", :limit => 20)

    @gender = [{"gender" => "Homem","value" => 0},{"gender" => "Mulher","value" => 0}]    
    @likes = {}
    tip = fs.venue_tips(params[:id],:sort => :popular, :limit => 1000)
    tip.items.each do |count|
      if count.user.gender == "male"
        @gender[0]["value"]+=1
      else
       @gender[1]["value"]+=1
      end
     
      if count.likes.summary == nil
        count.likes.summary = "0 likes"
      end
      if @likes[count.likes.summary] == nil
        @likes[count.likes.summary] = 1
      else
        @likes[count.likes.summary] += 1
      end
    end
    respond_to do |f|
      f.html
    end
  end
  
  def photos
    fs = Foursquare2::Client.new(:client_id => '5XO4RX3ADLYLERXE2M25HH3KJ0UKQ5OER14MNHMYIMC31CUE', :client_secret => 'ZEQ2TZA1P0OC1R1G5DQGQCQGM1EO0P4JMGH4QEPBZDTT5OCA')
    venue_id = flash[:venue_id]
    flash[:venue_id] = venue_id
    photo = fs.venue_photos(venue_id, :group => "checkin", :group => "venue", :limit => 1000)
    @photos = [{"gender" => "Homem","value" => 0},{"gender" => "Mulher","value" => 0}]
    photo.items.each do |count|
     if count.user.gender == "male"
       @photos[0]["value"]+=1
     else
       @photos[1]["value"]+=1
     end
   end
    respond_to do |f|
      f.json
    end
  end
  
  def tips
    
  end

end
