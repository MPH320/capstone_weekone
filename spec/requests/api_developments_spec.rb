require 'rails_helper'

RSpec.describe "ApiDevelopments", type: :request do
	
	
	def parsed_body
		JSON.parse(response.body)
	end

	describe "RDBMS-backed" do
		before(:each) { Cities.delete_all }
		after(:each) { Cities.delete_all }
		
		it "create RDBMS-backed model" do 
			object=Cities.create(:name=>"test")
			expect(Cities.find(object.id).name).to eq("test")
		end
		
		it "expose RDBMS-backed API resource" do
			object=Cities.create(:name=>"test")
			expect(cities_path).to eq("/api/cities")
			get cities_path(object.id)
			expect(response).to have_http_status(:ok)
			expect(parsed_body["name"]).to eq("test")
		end
	end
	
	describe "MONGODB-backed" do
		before(:each) { States.delete_all }
		after(:each) { States.delete_all }
		
		it "create MONGODB-backed model" do
			object=States.create(:name=>"test")
			expect(States.find(object.id).name).to eq("test")
		end
		it "expose MONGODB-backed API resource" do
			object=States.create(:name=>"test")
			expect(states_path).to eq("/api/states")
			get states_path(object.id)
			expect(response).to have_http_status(:ok)
			expect(parsed_body["name"]).to eq("test")
			expect(parsed_body).to include("created_at")
			expect(parsed_body).to include("id"=>object.id.to_s)
		end
	end
	
end
