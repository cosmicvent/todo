class TasksController < ApplicationController

  def index
    @tasks = Task.all.to_a.sort_by{|x| x.priority.to_i}
    @task = Task.new
  end

  def create
    @task = Task.create(params[:task])
    render :json => @task
  end

  def update
    @task = Task.find(params[:id])
    @task.update_attributes(params[:task])
    render :json => @task
  end

  def edit
    @task = Task.find(params[:id])
  end

  def update_sort_order
    new_sort_order = JSON.parse(params[:sort])
    i = 0
    new_sort_order.each do|id|
      task = Task.find(id)
      task.priority = i
      task.save
      i += 1
    end
    render :json => {:success => true}
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    redirect_to root_path
  end

  def test
  end

  def currentdate
    render :text => Time.now.to_s
  end
end
