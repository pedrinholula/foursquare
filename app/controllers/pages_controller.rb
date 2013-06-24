class PagesController < ApplicationController
  def home
  end
    
  def show
    fs = Foursquare2::Client.new(:client_id => '5XO4RX3ADLYLERXE2M25HH3KJ0UKQ5OER14MNHMYIMC31CUE', :client_secret => 'ZEQ2TZA1P0OC1R1G5DQGQCQGM1EO0P4JMGH4QEPBZDTT5OCA')
    @local = fs.search_venues_by_tip(:near => 'Belo Horizonte', :query => params[:lq], :limit=>'10')
    respond_to do |f|
      f.json 
      f.html
    end
  end
end
