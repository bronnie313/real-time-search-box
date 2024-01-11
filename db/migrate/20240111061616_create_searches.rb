class CreateSearches < ActiveRecord::Migration[7.0]
  def change
    create_table :searches do |t|
      t.string :search_query
      t.string :user_ip

      t.timestamps
    end
  end
end
