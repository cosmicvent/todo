class TasksController < ApplicationController

  def index
    @tasks = Task.all.to_a.sort_by{|x| -x.priority.to_i}
    @task = Task.new
  end

  def create
    @task = Task.create(params[:task])
    render :json => @task
  end

  def update
    @task = Task.find(params[:id])
    @task.update_attributes(params[:task])
    redirect_to root_path
  end

  def edit
    @task = Task.find(params[:id])
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
