class LocalController < ApplicationController
  def index
  end

  def show
    fs = Foursquare2::Client.new(:client_id => '5XO4RX3ADLYLERXE2M25HH3KJ0UKQ5OER14MNHMYIMC31CUE', :client_secret => 'ZEQ2TZA1P0OC1R1G5DQGQCQGM1EO0P4JMGH4QEPBZDTT5OCA')
    flash[:venue_id] = params[:id]
    @local = fs.venue(params[:id])
    @venue_photo = fs.venue_photos(params[:id], :group => "checkin", :group => "venue", :limit => 20)
    
    @similar={}
    similar = fs.search_venues_by_tip(:near => 'Belo Horizonte', :query => @local.categories.first.name, :categoryId => @local.categories.first.id, :intent => "match")
    similar.each do |e|
      if !@similar.has_key? e.name
        if e.categories.first.id == @local.categories.first.id
          @similar[e.name] = e
          ph = fs.venue_photos(@similar[e.name].id,:group => "checkin", :group => "venue", :limit => 200)
          ti = fs.venue_tips(@similar[e.name].id,:sort => :popular, :limit => 200)
          @similar[e.name].update(ph)
          @similar[e.name].update(ti)
        end
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
    p = {}
    photo.items.each do |p1|
      if p.has_key? p1.user.gender
        p[p1.user.gender]+=1
      else
        p[p1.user.gender]=1
      end
    end
    @photos=[]
    p.each do |key, val|
      @photos.push({:gender => key.humanize,:value => val})
    end

    respond_to do |f|
      f.json
    end
  end
  
  def tips
    tip = fs.venue_tips(params[:id],:sort => :popular, :limit => 1000)
    #Contando quantos likes tem cada dica
    t={}
    tip.items.each do |t1|
      if t.has_key? t1.likes.summary
        t[t1.likes.summary]+=1
      else
        t[t1.likes.summary]=1
      end
    end
    @tips=[]
    t.each do |key,val|
      @tips.push({:likes => key,:value => val})
    end
  end

end
