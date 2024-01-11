class Search < ApplicationRecord
    validates_presence_of :query, :user_ip
end
